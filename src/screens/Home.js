import { StyleSheet, Text, View, FlatList, AppState } from "react-native";
import { useEffect, useState, useCallback } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fS } from "../core/fonts";

import { theme, skeleton, cardWidth, verticalBlankSpace } from "../core/theme";

// import
import Header from "../Components/Header";
import DeviceComponent from "../Components/DeviceComponent";
import EmptyDevice from "../Components/EmptyDevice";

// import DeviceComponent from "../Components/DeviceComponent";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

import Amplify from "@aws-amplify/core";
import { AWSIoTProvider } from "@aws-amplify/pubsub";
import { getUser, getDevicesbyUser } from "../API/UserDB";
import { speak } from "../core/multilingual/tts.js";
import { subscribeAllDevices } from "../core/mqtt/pubsub";

//Action Creators
import { getDevices } from "../core/redux";
const Stack = createNativeStackNavigator();

export default HomeScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  // const [devices, setDevices] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [appState, setappState] = useState("active");
  const [refreshDeviceSubscription, setRefreshDeviceSubscription] =
    useState(false);

  const { deviceRefresh, userRefresh, username } = useSelector((state) => {
    return state.general;
  });

  const { devices, loading } = useSelector((state) => {
    return state.device;
  });

  const _addIoTPluggable = () => {
    Amplify.addPluggable(
      new AWSIoTProvider({
        aws_pubsub_region: "ap-south-1",
        aws_pubsub_endpoint:
          "wss://a2s01vbeprvgnz-ats.iot.ap-south-1.amazonaws.com/mqtt",
      })
    );
  };

  const _removeIoTPluggable = () => {
    Amplify.PubSub.removePluggable("AWSIoTProvider");
  };

  const _handleAppStateChange = (nextAppState) => {
    // console.log("APP STATE:", nextAppState);
    // Check if app state is changed
    // if (nextAppState != appState) {
    // 	setappState(nextAppState);
    // console.log("APP STATE VARIABLE:", appState);
    // Check if App is moved to background
    if (nextAppState === "background" || nextAppState === "inactive") {
      // remove Iot Pluggable
      _removeIoTPluggable();
      // console.log("Pluggable Removed!");
      // console.log(appState);
    }
    //Check if App is moved to foreground
    if (nextAppState === "active") {
      // Add IoT Pluggable
      _addIoTPluggable();
      // console.log("Pluggable Added!");
      // console.log(appState);
      // Refresh subscribe in all device components
      // setRefreshDeviceSubscription(!refreshDeviceSubscription);
      // dispatch({ type: "DEVICE_REFRESH_SUBSCRIPTION" });
      dispatch(getDevices());
    }
  };

  useEffect(() => {
    // speak("Namaste! Main farmio hun.");
    _addIoTPluggable();
    dispatch(getDevices());

    // getDevicesbyUser().then((devices) => {
    // 	console.log("DEVICES: ", devices);
    // 	setDevices(devices);
    // 	dispatch({
    // 		type: "SET_DEVICES",
    // 		payload: devices,
    // 	});

    // 	// console.log(
    // 	// 	subscribeAllDevices(devices.map((device) => device.deviceId))
    // 	// );
    // 	// dispatch({
    // 	// 	type: "SET_DEVICE_SCHEDULES",
    // 	// 	payload: devices,
    // 	// });
    // 	//
    // });
  }, [deviceRefresh]);

  // Event Listener when app state changes
  useEffect(() => {
    const subscribeState = AppState.addEventListener(
      "change",
      _handleAppStateChange
    );

    return () => {
      subscribeState.remove();
    };
  }, []);

  useEffect(() => {
    setUserLoading(true);
    getUser().then((user) => {
      setName(user.name);
      console.log("USER IN HOME:", user);
      dispatch({ type: "SET_USER", payload: user });
      dispatch({ type: "SET_USERNAME", payload: user.name });
      dispatch({
        type: "UPDATE_PROFILE_PHOTO",
        payload: user.profilePhoto,
      });
      setUserLoading(false);
    });
  }, [userRefresh]);

  // useFocusEffect(
  // 	useCallback(() => {
  // 		setUserLoading(true);
  // 		getUser().then((user) => {
  // 			setName(user.name);
  // 			console.log("USER IN HOME:", user);
  // 			dispatch({ type: "SET_USER", payload: user[0] });
  // 			setUserLoading(false);
  // 		});
  // 	}, [userRefresh])
  // );

  // useEffect(() => {
  // const sub = subscribe("iloVvq", {
  // 	onMessage: (msg) => {
  // 		console.log(msg);
  // 	},
  // });
  // return function cleanup() {
  // 	console.log("UNSUB Triggered");
  // 	sub.unsubscribe();
  // };
  // sub.unsubscribe();
  //get the user data from database.
  //check for the name of user
  // subscribe to the available devices of user
  // Auth.currentCredentials().then((info) => {
  // 	const cognitoIdentityId = info.identityId;
  // 	console.log(cognitoIdentityId);
  // });
  // Initialize the Amazon Cognito credentials provider
  // AWS.config.region = 'ap-south-1'; // Region
  // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //     IdentityPoolId: 'ap-south-1:305b13a6-c84e-4ab3-9f3a-2ffdc040b75b',
  // });
  // PubSub.subscribe("$aws/things/iloVvq/shadow/update/delta").subscribe({
  // 	next: (data) => {
  // 		const topic = data.value[Object.getOwnPropertySymbols(data.value)[0]]; // Read about symbols https://www.keitlhcirkel.co.uk/metaprogramming-in-es6-symbols/
  // 	},
  // 	error: (error) => console.error(error),
  // 	complete: () => console.log("Done"),
  // });
  // }, []);

  // useEffect(() => {
  // 	publish("get", "iloVvq");
  // }, []);

  // useEffect(() => {
  // 	const subscription = AppState.addEventListener("change", (nextAppState) => {
  // 		if (
  // 			appState.current.match(/inactive|background/) &&
  // 			nextAppState === "active"
  // 		) {
  // 			console.log("App has come to the foreground!");
  // 		}

  // 		appState.current = nextAppState;
  // 		setAppStateVisible(appState.current);
  // 		console.log("AppState", appState.current);
  // 	});

  // 	return () => {
  // 		subscription.remove();
  // 	};
  // }, []);

  //Filter by Device Name
  // const filteredDevices = devices.filter((device) => {
  // 	return device.deviceName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  // });

  return (
    <View style={styles.root}>
      <Header loading={userLoading} name={username} navigation={navigation} />

      {/* <View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					...cardWidth,
				}}
			>
				<HI
					image
					source={
						"https://pbs.twimg.com/media/ElcekfFVcAEfaBl?format=png&name=large"
					}
				></HI>
				<View
					style={{
						justifyContent: "center",
						borderRadius: wp(2.91),
						backgroundColor: theme.colors.background,
						height: hp(7.39),
						width: cardWidth.width / 1.55,
						paddingHorizontal: wp(2),
						...shadow,
					}}
				>
					<Text
						style={{
							fontSize: wp(4.37),
							fontFamily: fS().Light,
							color: theme.colors.secondary,
						}}
					>
						{t("Welcome")},
					</Text>
					<Text
						style={{
							fontSize: wp(5.35),
							fontFamily: fS().Bold,
							color: theme.colors.secondary,
						}}
					>
						{t(name)}
					</Text>
				</View>
				<HI
					onPress={() => {
						console.log("Notif Press");
						navigation.navigate("Notifications");
					}}
					badgeValue={12}
					containerStyle={{}}
				></HI>
			</View> */}

      <View style={{ ...cardWidth, marginTop: hp(2.5) }}>
        {/* {!loading ? ( */}
        <Text
          style={{
            fontSize: wp(5.35),
            fontFamily: fS().Bold,
            color: theme.colors.secondary,
            marginBottom: hp(2.5),
            marginTop: hp(2.5),
          }}
        >
          {t("Devices")}
        </Text>
        {/* ) : ( */}
        {/* <SkeletonPlaceholder
            backgroundColor={skeleton.backgroundColor}
            speed={skeleton.speed}
            direction={skeleton.direction}
            highlightColor={skeleton.highlightColor}
          >
            <View
              style={{ ...cardWidth, marginTop: hp(2.5), height: wp(5.35) }}
            ></View>
          </SkeletonPlaceholder>
        )} */}
        {devices.length > 0 ? (
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              ...cardWidth,
            }}
          >
            <FlatList
              data={devices}
              renderItem={(data) => {
                return (
                  <DeviceComponent
                    navigation={navigation}
                    data={data.item}
                    index={data.index}
                    refreshDeviceSubscription={refreshDeviceSubscription}
                  />
                );
              }}
              keyExtractor={(item) => item.deviceId}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : (
          <EmptyDevice
            onPress={() => {
              navigation.navigate("Add Device");
            }}
          />
        )}
      </View>

      {/* <View style={{ position: "absolute", bottom: 0, paddingVertical: hp(4) }}>
				<FooterMenu
					initialScreen={"Home"}
					onChangeItem={(screen) => {
						navigation.navigate(screen);
					}}
				/>
			</View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    height: "100%",
    ...verticalBlankSpace,
  },
});
