import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { formatRelative } from "date-fns";
import { Formik } from "formik";
import {
  GetLanguage,
  SetLanguage,
  getNotifs,
  clearNotifs,
} from "../core/asyncStorage";
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

import ArrowKeys from "../Components/ArrowKeys";
import NotifCard from "../Components/NotifCard";
import BottomFAB from "../Components/BottomFAB";

export default function Welcome({ navigation }) {
  const { t, i18n } = useTranslation();
  const [notifs, setNotifs] = useState([]);
  const [refresh, setRefesh] = useState(false);

  const { general } = useSelector((state) => {
    return state;
  });

  const { notifRefresh } = general;

  useEffect(() => {
    getNotifs().then((n) => {
      setNotifs(JSON.parse(n));
      // console.log(n);
    });
  }, [refresh, notifRefresh]);

  const onClear = () => {
    clearNotifs();
    setRefesh(!refresh);
  };

  return (
    <View style={styles.root}>
      <View
        style={{
          ...cardWidth,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ArrowKeys onPress={() => navigation.goBack()} />
        <Text
          style={{
            fontSize: wp(5.35),
            fontFamily: fS().Bold,
            color: theme.colors.secondary,
            textAlign: "center",
            alignSelf: "center",
          }}
        >
          {t("Notifications")}
        </Text>
        <ArrowKeys blank />
      </View>
      <View style={{ marginTop: hp(5) }}>
        <FlatList
          data={notifs}
          renderItem={(data) => {
            // console.log(data);
            return (
              <NotifCard
                notificationTitle={data.item.head}
                notificationText={data.item.body}
                notificationTS={data.item.date}
                containerStyle={{ marginBottom: hp(1.25) }}
              />
            );
          }}
          ListEmptyComponent={() => {
            return (
              <Text
                style={{
                  alignSelf: "center",
                  fontFamily: fS().Medium,
                  fontSize: wp(4),
                  color: theme.colors.greyIcons,
                }}
              >
                {t("You have no new notifications!")}
              </Text>
            );
          }}
          keyExtractor={(item) => item.date}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {notifs !== null ? (
        <View
          style={{ position: "absolute", bottom: 0, paddingVertical: hp(4) }}
        >
          <BottomFAB
            icon="clear"
            text={"Clear"}
            onPress={() => {
              onClear();
            }}
            backgroundColor={theme.colors.error}
            textColor={theme.colors.error}
          />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    height: "100%",
    ...verticalBlankSpace,
  },
  container: {
    marginTop: hp(15),
    alignItems: "center",
    justifyContent: "center",
  },
});
