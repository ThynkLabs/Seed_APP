import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { useEffect, useState, useMemo, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";

import { Formik } from "formik";
import { GetLanguage, SetLanguage } from "../core/asyncStorage";
import { useSelector, useDispatch } from "react-redux";
import FontProvider, {
  font,
  selectEnglish,
  fS,
  setFontLan,
} from "../core/fonts";

import { Icon, withBadge, Badge } from "react-native-elements";
import {
  theme,
  shadow2,
  shadow,
  shadowFooterMenu,
  cardWidth,
  verticalBlankSpace,
} from "../core/theme";

import * as yup from "yup";

import HI from "../Components/HeaderIcons";
// import
import FooterMenu from "../Components/FooterMenu";
import Device from "../Components/Device";
import SettingsCard from "../Components/SettingsCard";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import Input from "../Components/Input";
import List from "../Components/List";
import ChangeNameModal from "../Components/ChangeNameModal";
import { getUser, setName, setLanguageDB, setLoginDB } from "../API/UserDB";
import { setDateLocaleLanguage } from "../core/multilingual/datelocale";
import { getDevices } from "../core/redux";

import { Auth } from "@aws-amplify/auth";

export default function Settings({ nav, onLogout }) {
  const { t, i18n } = useTranslation();
  const [LogoutModalVisibility, setLogoutModalVisibility] = useState(false);
  const [changeNameModal, setChangeNameModal] = useState(false);
  const [changeLanguageModal, setChangeLanguageModal] = useState(false);
  // const [user, setUser] = useState({});
  const [settingsLoading, setSettingsLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [language, setLanguage] = useState("");

  const ButtonRef = useRef();

  const dispatch = useDispatch();

  const { general } = useSelector((state) => {
    return state;
  });

  const { userRefresh, username } = general;

  // useMemo(() => {
  // 	setSettingsLoading(true);
  // 	getUser().then((user) => {
  // 		setUser(user);
  // 		setSettingsLoading(false);
  // 	});
  // }, [userRefresh]);

  useEffect(() => {
    GetLanguage().then((l) => {
      setLanguage(l);
    });
  });

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => console.log(err));
  };

  const changeName = (valuesObject) => {
    setName(valuesObject)
      .then((stat) => {
        console.log(stat);
      })
      .catch((e) => {
        setNameError("Something went wrong.");
      });
  };

  const changeModal = (type) => {
    setChangeNameModal(type === "name" ? true : false);
    setChangeLanguageModal(type === "language" ? true : false);
  };

  const nameSchema = yup.object().shape({
    name: yup.string().required("Please, provide your name!"),
  });

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  const createTwoButtonAlert = () =>
    Alert.alert(
      t("Log Out"),
      t("Do you really want to log out from this device?"),
      [
        {
          text: t("Yes"),
          onPress: () => {
            setLoginDB("logout", null);
            signOut();
            // onLogout();
          },
        },
        {
          text: t("Cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );
  const SettingCard = () => {
    return (
      <SettingsCard
        sKey="Change Name"
        value="Darshan Dodal"
        mainIcon="user"
        mainIconType="font-awesome-5"
        actionIcon="angle-right"
        actionIconType="font-awesome-5"
        containerStyle={{ marginBottom: 10 }}
        dualText
      />
    );
  };

  return (
    <View style={styles.root}>
      <Header loading={settingsLoading} name={username} navigation={nav} />
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
						{t("Darshan Dodal")}
					</Text>
				</View>
				<HI badgeValue={12} containerStyle={{}}></HI>
			</View> */}

      <View style={{ ...cardWidth, marginTop: hp(2.5) }}>
        <Text
          style={{
            fontSize: wp(5.35),
            fontFamily: fS().Bold,
            color: theme.colors.secondary,
            marginBottom: hp(2.5),
            marginTop: hp(2.5),
          }}
        >
          {t("Settings")}
        </Text>
        <View
          style={{
            alignSelf: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Device
            online={false}
            updateTime="Contact us right now."
            deviceName="Need Help?"
            onToggle={(e) => {
              console.log("Device State: ", e);
            }}
            onPress={(e) => {
              Linking.openURL("whatsapp://send?text=Hii&phone=+919359526445");
            }}
            cardStyle={{
              margin: hp(0.3),
            }}
            contactText={"Contact us"}
            contactAction={"right now."}
            icon="question-answer"
            iconType="material"
            toggleSW
            settingCard
            NoStat
          />
        </View>
      </View>

      <ScrollView style={{ marginTop: hp(1) }}>
        <SettingsCard
          sKey="Change Name"
          loading={settingsLoading}
          value={username}
          mainIcon="user"
          mainIconType="font-awesome-5"
          actionIcon="angle-right"
          actionIconType="font-awesome-5"
          containerStyle={{ marginBottom: 10 }}
          onPress={() => changeModal("name")}
          dualText
        />
        <SettingsCard
          sKey="Change Language"
          value={
            language === "en"
              ? "English"
              : language === "hi"
              ? "Hindi"
              : language === "mr"
              ? "Marathi"
              : null
          }
          mainIcon="language"
          mainIconType="font-awesome-5"
          actionIcon="angle-right"
          actionIconType="font-awesome-5"
          containerStyle={{ marginBottom: 10 }}
          onPress={() => changeModal("language")}
          dualText
        />
        <SettingsCard
          sKey="Feedback"
          value="Feedback"
          mainIcon="star"
          mainIconType="font-awesome-5"
          actionIcon="angle-right"
          actionIconType="font-awesome-5"
          containerStyle={{ marginBottom: 10 }}
        />
        <SettingsCard
          sKey="Privacy & Policy"
          value="Privacy & Policy"
          mainIcon="file-alt"
          mainIconType="font-awesome-5"
          actionIcon="angle-right"
          actionIconType="font-awesome-5"
          containerStyle={{ marginBottom: 10 }}
        />
        <SettingsCard
          sKey="Logout"
          value="Log Out"
          mainIcon="logout"
          mainIconType="material"
          actionIcon="angle-right"
          actionIconType="font-awesome-5"
          containerStyle={{ marginBottom: 10 }}
          onPress={() => {
            setLogoutModalVisibility(true);
            createTwoButtonAlert();
          }}
        />
      </ScrollView>
      <ChangeNameModal
        changeNameModal={changeNameModal}
        setChangeNameModal={setChangeNameModal}
      />
      <Formik
        initialValues={{
          language: language,
        }}
        enableReinitialize={true}
        onSubmit={(values, s) => {
          i18n
            .changeLanguage(values.language)
            .then(() => {
              SetLanguage(values.language)
                .then((response) => {
                  dispatch({ type: "USER_REFRESH" });
                  dispatch(getDevices());
                  dispatch({ type: "SET_LANGUAGE", payload: values.language });
                  setDateLocaleLanguage(values.language);
                  ButtonRef.current.stopLoading();
                })
                .catch((e) => {
                  dispatch({ type: "USER_REFRESH" });
                });
            })
            .catch((err) => console.log(err));
          setLanguageDB(values);
        }}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => {
          return (
            <Modal
              setModalVisible={setChangeLanguageModal}
              modalVisible={changeLanguageModal}
              Heading="Change Language"
              handleSubmit={handleSubmit}
              bref={ButtonRef}
              onCancel={() => setChangeLanguageModal(false)}
            >
              <List
                options={[
                  { key: 1, id: "en", value: "English" },
                  { key: 2, id: "hi", value: "Hindi" },
                  { key: 3, id: "mr", value: "Marathi" },
                ]}
                initialOption={language}
                onOptionChange={
                  handleChange("language")
                  // setInput(selected.key);
                }
                selectedOption={values.language}
                containerStyle={{
                  width: cardWidth.width - hp(4),
                }}
              />
            </Modal>
          );
        }}
      </Formik>
      {/* 
			<Modal
				setModalVisible={setChangeLanguageModal}
				modalVisible={changeLanguageModal}
			/> */}
      {/* <View style={{ position: "absolute", bottom: 0, paddingVertical: hp(4) }}>
				<FooterMenu
					initialScreen={"Settings"}
					onChangeItem={(screen) => {
						navigation.navigate(screen);
					}}
				/>
			</View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    height: "100%",
    ...verticalBlankSpace,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",

    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
