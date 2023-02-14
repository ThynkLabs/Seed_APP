import React, { useEffect, useState, useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme, cardWidth } from "../core/theme";
import { Icon } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontProvider, { fS } from "../core/fonts";
import { useTranslation } from "react-i18next";

import Button from "./Button";

export default NoInternet = ({ onTryAgain, onUpdate, appblock }) => {
  const { t, i18n } = useTranslation();
  const ButtonRef = useRef();
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: hp(100),
          alignItems: "center",
          justifyContent: "center",
          ...cardWidth,
        }}
      >
        <Icon
          name={appblock.type === "no-internet" ? "wifi-off" : "system-update"}
          type={"material-icons"}
          size={hp("20")}
          solid
          color={theme.colors.success}
        />
        <Text
          style={{
            fontSize: wp(5),
            fontFamily: fS().Bold,
            textAlign: "center",
          }}
        >
          {t(appblock.title)}
        </Text>

        <Text
          style={{
            fontSize: wp(4),
            fontFamily: fS().Light,
            textAlign: "center",
            marginTop: hp(0.4),
            marginBottom: hp(3),
          }}
        >
          {t(appblock.message)}
        </Text>

        <Button
          solid={false}
          title={appblock.action}
          containerStyle={{ marginBottom: hp(1) }}
          onPress={() => {
            ButtonRef.current.startLoading();
            appblock.type === "no-internet" ? onTryAgain() : onUpdate();
            ButtonRef.current.stopLoading();
          }}
          ref={ButtonRef}
        />
        {/* <Pressable
                        style={[styles.button, styles.buttonClose]}
                        // onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable> */}
      </View>
    </View>
  );
};
