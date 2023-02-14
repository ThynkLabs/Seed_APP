import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";

import { Formik } from "formik";
import { GetLanguage, SetLanguage, getNotifs } from "../core/asyncStorage";
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
  skeleton,
  shadow2,
  shadow,
  shadowFooterMenu,
  cardWidth,
  verticalBlankSpace,
} from "../core/theme";

import HI from "../Components/HeaderIcons";
// import
import FooterMenu from "../Components/FooterMenu";
import Device from "../Components/Device";
import SettingsCard from "../Components/SettingsCard";
import { getUser, setName, setProfilePhoto } from "../API/UserDB";
import { UpdateImage } from "../API/FileUpload";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { launchImageLibrary } from "react-native-image-picker";
import FastImage from "react-native-fast-image";

export default function Header({ navigation, onLogout, name, loading }) {
  const { t, i18n } = useTranslation();
  // const [name, setName] = useState("Darshan");
  // const [notifCount, setNotifCount] = useState();
  const [File, setFile] = useState({});
  const dispatch = useDispatch();

  const { general } = useSelector((state) => {
    return state;
  });

  const { userRefresh, user, notifCount, profilePhoto, loaderRandomNumber } =
    general;

  // useEffect(() => {
  // 	getUser().then((user) => {
  // 		console.log("USER IN HEAD: ", user);
  // 		setName(user.name);
  // 	});
  // }, []);
  // useEffect(() => {
  // 	getNotifs().then((n) => {
  // 		setNotifCount(JSON.parse(n).length);
  // 	});
  // }, []);

  // console.log(profilePhoto);

  if (loading) {
    return (
      <SkeletonPlaceholder
        backgroundColor={skeleton.backgroundColor}
        speed={skeleton.speed}
        direction={skeleton.direction}
        highlightColor={skeleton.highlightColor}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            ...cardWidth,
          }}
        >
          <View
            style={{
              // borderWidth: !image ? 0.5 : 0,
              width: wp(12.16),
              height: hp(7.39),
              borderRadius: wp(2.67),
              ...shadow,
            }}
          ></View>
          <View
            style={{
              justifyContent: "center",
              borderRadius: wp(2.91),
              height: hp(7.39),
              width: cardWidth.width / 1.55,
              paddingHorizontal: wp(2),
              ...shadow,
            }}
          ></View>
          <View
            style={{
              // borderWidth: !image ? 0.5 : 0,
              width: wp(12.16),
              height: hp(7.39),
              borderRadius: wp(2.67),
              ...shadow,
            }}
          ></View>
        </View>
      </SkeletonPlaceholder>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        ...cardWidth,
      }}
    >
      <HI
        image={profilePhoto !== "" ? true : false}
        source={profilePhoto}
        randomString={loaderRandomNumber}
        onPress={() => {
          launchImageLibrary({ mediaType: "photo" })
            .then((d) => {
              const formData = new FormData();
              formData.append("file", {
                uri: d.assets[0].uri,
                name: d.assets[0].fileName,
                size: d.assets[0].fileSize,
                width: d.assets[0].width,
                height: d.assets[0].height,
                type: d.assets[0].type,
              });
              UpdateImage(formData).then((iuploadobj) => {
                setProfilePhoto(iuploadobj.file).then(() => {
                  dispatch({
                    type: "UPDATE_PROFILE_PHOTO",
                    payload: iuploadobj.file,
                  });
                  dispatch({
                    type: "UPDATE_LOADER_RANDOM_NUMBER",
                  });
                });
              });
            })
            .catch((e) => {
              console.log(e);
            });
        }}
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
          navigation.navigate("Notifications");
        }}
        badgeValue={notifCount}
        containerStyle={{}}
      ></HI>
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
