import "react-native-gesture-handler";
import React, { useEffect, useState, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import Modal from "react-native-modal";
// import Home from "./Home.js";
import AppLoading from "expo-app-loading";
import { useFonts, Exo2_400Regular } from "@expo-google-fonts/exo-2";

//Import Icons from FONT AWESOME
import "./src/assets/icons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { theme, cardWidth } from "./src/core/theme";

import FontProvider, { fS } from "./src/core/fonts";

//-------------------------------------------------- REDUX Store----------------------------------------------------------------

import { reducer } from "./src/core/redux/reducer.js";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

//---------------------XX--------------------------- REDUX Store---------------------------------XX-----------------------------

//--------------------------------------------------- NETINFO-------------------------------------------------------------------
import NetInfo from "@react-native-community/netinfo";
//---------------------XX--------------------------- NETINFO-------------------------------------XX-----------------------------

import RNFS from "react-native-fs";

import { Auth, Hub } from "aws-amplify";
import "./src/core/multilingual/i18n";
import { useTranslation } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  NavigationContainer,
  PrivateValueStore,
} from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Welcome from "./src/screens/Welcome";
import Notifications from "./src/screens/Notifications";
import DeviceDetail from "./src/screens/DeviceDetail";
import Home from "./src/screens/HomeNav";
import Settings from "./src/screens/Settings";
import AddDevice from "./src/screens/AddDevice";
import SetSchedule from "./src/screens/SetSchedule";
import Intro from "./src/screens/Intro";
import HomeLoading from "./src/screens/HomeLoading";

import FooterMenu from "./src/Components/FooterMenu";
import NoInternet from "./src/Components/NoInternet";
import {
  GetLanguage,
  SetLanguage,
  storeToken,
  getToken,
  getNotifs,
} from "./src/core/asyncStorage";
import { getUser, setName, setidentityId } from "./src/API/UserDB";
import AttachPolicy from "./src/API/AttachPolicy";
import store from "./src/core/redux/store";
import { getDevices } from "./src/core/redux";

// import PushNotification from "@aws-amplify/pushnotification";
// import { PushNotificationIOS } from "@react-native-community/push-notification-ios";
// import {
// 	onNotification,
// 	onNotificationOpened,
// } from "./src/core/PushNotification/CloudNotification";

import { setDateLocaleLanguage } from "./src/core/multilingual/datelocale";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const store = createStore(reducer);

const Screens = ({ navigation, onLogout }) => {
  const { t, i18n } = useTranslation();
  const [CurrentTab, setCurrentTab] = useState(
    "HomeScreen-WfL5blop6cmXcyj1BOzus"
  );
  const [screenChange, setScreenChange] = useState(false);
  const [Refresh, setRefresh] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const { stackScreen } = useSelector((state) => {
    return state.general;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    getNotifs().then((n) => {
      dispatch({ type: "SET_NOTIF_COUNT", payload: JSON.parse(n).length });
    });
  }, []);

  useMemo(() => {
    Auth.currentCredentials().then((info) => {
      const cognitoIdentityId = info.identityId;
      // console.log(cognitoIdentityId);
    });
    getUser()
      .then((user) => {
        console.log("USER IN APP: ", user);
        if (!user.name) {
          setShowIntro(true);
        }
        if (!user.identityId) {
          Auth.currentCredentials().then((info) => {
            const cognitoIdentityId = info.identityId;
            console.log("COG IDENTITY ID:", cognitoIdentityId);
            AttachPolicy(cognitoIdentityId)
              .then((policy) => {
                setidentityId(cognitoIdentityId)
                  .then((res) => {
                    console.log("ID saved in DB");
                  })
                  .catch((e) => console.log("Something went wrong:", e));
              })
              .catch((e) => {
                console.log("Error");
              });

            // Save in Database

            // Attach this id to the AWS IOT policy (Make API call to microservice)
          });
        }

        // dispatch({ type: "USER_REFRESH" });
      })
      .catch((error) => {
        dispatch({ type: "USER_REFRESH" });
      });
  }, [Refresh]);

  // useEffect(() => {
  // 	Auth.currentCredentials().then((info) => {
  // 		const cognitoIdentityId = info.identityId;
  // 		// console.log(cognitoIdentityId);
  // 	});
  // 	getUser()
  // 		.then((user) => {
  // 			// console.log(user);
  // 			if (!user.name) {
  // 				setShowIntro(true);
  // 			}
  // 			if (!user.identityId) {
  // 				Auth.currentCredentials().then((info) => {
  // 					const cognitoIdentityId = info.identityId;
  // 					console.log("COG IDENTITY ID:", cognitoIdentityId);
  // 					AttachPolicy(cognitoIdentityId)
  // 						.then((policy) => {
  // 							setidentityId(cognitoIdentityId)
  // 								.then((res) => {
  // 									console.log("ID saved in DB");
  // 								})
  // 								.catch((e) => console.log("Something went wrong:", e));
  // 						})
  // 						.catch((e) => {
  // 							console.log("Error");
  // 						});

  // 					// Save in Database

  // 					// Attach this id to the AWS IOT policy (Make API call to microservice)
  // 				});
  // 			}

  // 			dispatch({ type: "USER_REFRESH" });
  // 		})
  // 		.catch((error) => {
  // 			dispatch({ type: "USER_REFRESH" });
  // 		});
  // }, [Refresh]);

  // console.log("CR SR : ", stackScreen);

  const SettingsScreen = () => {
    return <Settings nav={navigation} onLogout={onLogout} />;
  };

  if (showIntro) {
    return (
      <Intro
        submit={(name) => {
          setName(name)
            .then((res) => {
              console.log("NAME RES", res);
            })
            .catch((err) => {
              console.log(err);
            });

          setRefresh(!Refresh);
          setShowIntro(false);
        }}
      />
    );
  }

  return (
    <Tab.Navigator
      tabBar={(props) =>
        CurrentTab.search("Add Device") > -1 ||
        stackScreen.search("Notifications") > -1 ||
        stackScreen.search("DeviceDetail") > -1 ||
        stackScreen.search("SetSchedule") > -1 ? null : (
          <FooterMenu {...props} />
        )
      }
      screenListeners={({ navigation }) => ({
        state: (e) => {
          if (!navigation.canGoBack()) {
            console.log("we're on the initial screen");
          }
        },
        focus: (e) => {
          setCurrentTab(e.target);
          dispatch({ type: "CHANGE_SCREEN", payload: e.target });
          // console.log(e.target);
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add Device"
        component={AddDevice}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const WelcomeScreens = ({ onLogin, navigation }) => {
  return <Welcome onLogin={onLogin} navigation={navigation} />;
};
const PreAPP = () => {
  // selectEnglish(false);
  const { t, i18n } = useTranslation();
  const [auth, setAuth] = useState();
  const [loginRefresh, setLoginRefresh] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const dispatch = useDispatch();
  const { dataRefresh, networkAvailable } = useSelector((state) => {
    return state.general;
  });

  // onNotification();
  // onNotificationOpened();
  // useEffect(() => {
  // 	NetInfo.fetch().then((state) => {
  // 		console.log("Connection type", state.type);
  // 		console.log("Is connected?", state.isConnected);
  // 		dispatch({
  // 			type: "SET_NETWORK_CONNECTED",
  // 			payload: state.isConnected,
  // 		});
  // 	});
  // 	// console.log("NET INFO:", NetInfo.isConnected);
  // 	// const unsubscribe = NetInfo.addEventListener((networkState) => {
  // 	// 	console.log("Connection type - ", networkState.type);
  // 	// 	console.log("Is connected? - ", networkState.isConnected);
  // 	// 	dispatch({
  // 	// 		type: "SET_NETWORK_CONNECTED",
  // 	// 		payload: networkState.isConnected,
  // 	// 	});
  // 	// });

  // 	// return () => unsubscribe();
  // }, [loginRefresh]);

  // const checkConnectivity = () => {
  // 	NetInfo.isConnected().then((isConnected) => {
  // 		if (isConnected) {
  // 			console.log("You are online!");
  // 		} else {
  // 			console.log("You are offline!");
  // 		}
  // 	});
  // };

  const _isAppOld = () => {
    // Get version number from user db

    // Check if the app is too old that allowed version from company db

    // if the app is old then return true
    return false;
  };

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      if (networkAvailable !== state.isConnected) {
        // dispatch
        dispatch({
          type: "SET_NETWORK_CONNECTED",
          payload: state.isConnected,
        });
        if (state.isConnected) {
          dispatch(getDevices());
        }
      }
    });

    // Unsubscribe
    return () => {
      return unsubscribe();
    };
  }, []);

  useEffect(() => {
    GetLanguage().then((language) => {
      setDateLocaleLanguage(language);
      dispatch({ type: "SET_LANGUAGE", payload: language });
      i18n
        .changeLanguage(language)
        .then(() => {
          console.log("Language Set");
        })
        .catch((e) => {
          console.log("Could not set language");
        });
    });
  }, [loginRefresh]);

  // useEffect(() => {
  // 	getUser().then((user) => {
  // 		dispatch({ type: "SET_USER", payload: user });
  // 	});
  // }, [dataRefresh]);

  const isSignedIn = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
      // console.log("USER IN APP: ", user);
      setAuth(user);
      setAuthLoading(false);
    } catch (e) {
      setAuth(null);
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    setAuthLoading(true);
    isSignedIn();
  }, [loginRefresh]);

  useEffect(() => {
    const listener = (data) => {
      console.log("SIGNED IN DATA", data);
      if (data.payload.event === "signIn" || data.payload.event === "signOut") {
        isSignedIn();
        // getToken().then((t) => {
      }
    };

    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, [loginRefresh]);

  if (authLoading) {
    // Put something in home loading... like illustrations or maybe message
    return <HomeLoading />;
  }

  if (!networkAvailable || _isAppOld()) {
    return (
      <NoInternet
        onTryAgain={() => {
          // checkConnectivity();
          NetInfo.fetch().then((state) => {
            dispatch({
              type: "SET_NETWORK_CONNECTED",
              payload: state.isConnected,
            });
          });
          // setLoginRefresh(!loginRefresh);
        }}
        onUpdate={() => {
          // Redirect to playstore from here

          console.log("Update app");
        }}
        appblock={
          !networkAvailable
            ? {
                type: "no-internet",
                title: "Oops, No Internet Connection",
                message:
                  "Make sure wifi or cellular data is turned on and then try again.",
                action: "Try Again",
              }
            : {
                type: "old-version",
                title: "Old version of App",
                message:
                  "You are on the old version of App. Please download the latest version from play store.",
                action: "Update",
              }
        }
      />
    );
  }

  return (
    <>
      <Stack.Navigator>
        {auth ? (
          <Stack.Screen
            name="Screens"
            component={Screens}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="WelcomeScreens"
            component={WelcomeScreens}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
      {/* {auth ? (
				<Screens
					onLogout={() => {
						console.log("LOGGED OUT");
						// setAuth(false);
						setLoginRefresh(!loginRefresh);
					}}
				/>
			) : (
				<WelcomeScreens
					onLogin={(user) => {
						console.log("LOGGED IN");
						// setAuth(true); // Temp
						setLoginRefresh(!loginRefresh);
						// dispatch({ type: "LOGIN_REFRESH" });
					}}
				/>
			)} */}
    </>
  );
};

export default App = () => {
  return (
    <SafeAreaProvider>
      <FontProvider>
        <Provider store={store}>
          <NavigationContainer
            theme={{
              colors: {
                background: "#ffffff",
              },
            }}
          >
            <PreAPP />
          </NavigationContainer>
        </Provider>
      </FontProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
