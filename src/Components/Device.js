import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { fS } from "../core/fonts";

import { theme, shadow, skeleton } from "../core/theme";

import ToggleSwitch from "toggle-switch-react-native";
import TextTicker from "react-native-text-ticker";

import IC from "./IconContainer";
import { subscribe, publish } from "../core/mqtt/pubsub";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import BottomFAB from "../Components/BottomFAB";

export default function Device({
  state,
  online,
  data,
  deviceName,
  updateTime,
  onPress,
  onToggle,
  cardStyle,
  toggleSW,
  NoStat,
  settingCard,
  contactText,
  contactAction,
  icon,
  iconType,
  onLongPress,
  delayLongPress,
  loading,
  modifyMode,
  onCancelEditMode,
  onPressEdit,
  onPressDelete,
}) {
  const { t, i18n } = useTranslation();
  // const [state, setState] = useState(initialState);
  // console.log(state);
  // useEffect(() => {
  // 	publish("get", "iloVvq");
  // }, []);
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
            width: wp(38.92),
            height: wp(38.92),
            ...shadow,
            alignSelf: "center",
            borderRadius: wp(3.64),
            padding: wp(4),
            marginBottom: 10,
            ...cardStyle,
          }}
        ></View>
      </SkeletonPlaceholder>
    );
  }

  return (
    <View
      style={{
        width: wp(38.92),
        height: wp(38.92),
        backgroundColor: state ? theme.colors.primary : theme.colors.background,
        ...shadow,
        alignSelf: "center",
        borderRadius: wp(3.64),
        padding: wp(4),
        marginBottom: 10,
        ...cardStyle,
      }}
    >
      {modifyMode && (
        <View
          style={{
            position: "absolute",
            width: wp(38.92),
            height: wp(38.92),
            zIndex: 999,
          }}
        >
          <TouchableOpacity onPress={onCancelEditMode}>
            <View
              style={{
                borderRadius: wp(3.64),
                position: "absolute",
                width: wp(38.92),
                height: wp(38.92),
                backgroundColor: "black",
                opacity: 0.5,
              }}
            ></View>
            <View
              style={{
                width: wp(38.92),
                height: wp(38.92),
                justifyContent: "space-evenly",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <BottomFAB
                icon="edit"
                onPress={onPressEdit}
                backgroundColor="#101010"
              />
              <BottomFAB
                icon="delete"
                onPress={onPressDelete}
                backgroundColor={"#101010"}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={delayLongPress}
      >
        <View>
          <View
            style={{
              width: "100%",
              height: "55%",
              flexDirection: "row",
            }}
          >
            <View style={{ width: "50%" }}>
              <IC
                icon={icon}
                iconType={iconType}
                iconColor={
                  NoStat
                    ? theme.colors.primary
                    : state
                    ? theme.colors.whiteIcons
                    : theme.colors.secondary
                }
                invertBorder={state}
              />
              {!NoStat ? (
                <Text
                  style={{
                    fontSize: wp(3.5),
                    fontFamily: fS().Light,
                    color: state
                      ? theme.colors.whiteIcons
                      : online
                      ? theme.colors.primary
                      : theme.colors.error, // Online -> Primary, Offline -> error
                  }}
                >
                  {online ? t("Online") : t("Offline")}
                </Text>
              ) : null}
            </View>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              {!toggleSW ? (
                <ToggleSwitch
                  isOn={state}
                  onColor={theme.colors.primary}
                  offColor={theme.colors.filler}
                  trackOffStyle={{
                    borderColor: theme.colors.textSecondary,
                    borderWidth: 0.3,
                  }}
                  trackOnStyle={{
                    borderColor: "white",
                    borderWidth: 0.3,
                  }}
                  thumbOffStyle={{
                    backgroundColor: theme.colors.greyIcons,
                  }}
                  size="medium-large"
                  onToggle={(isOn) => {
                    onToggle(!state);
                    // setState(!state);
                  }}
                />
              ) : null}
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: "45%",
              justifyContent: "flex-end",
            }}
          >
            <TextTicker
              style={{
                fontSize: wp(4.86),
                fontFamily: fS().Regular,
                color: state
                  ? theme.colors.whiteIcons
                  : theme.colors.textSecondary,
              }}
              duration={10000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}
            >
              {t(deviceName)}
            </TextTicker>
            {settingCard ? (
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: wp(3),
                    fontFamily: fS().Light,
                    color: state
                      ? theme.colors.whiteIcons
                      : theme.colors.greyIcons,
                  }}
                >
                  {t(contactText) + " "}
                </Text>
                <Text
                  style={{
                    fontSize: wp(3),
                    textDecorationLine: "underline",
                    fontFamily: fS().Bold,
                    color: state
                      ? theme.colors.whiteIcons
                      : theme.colors.textSecondary,
                  }}
                >
                  {t(contactAction)}
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  fontSize: wp(2.5), //3
                  fontFamily: fS().Light,
                  color: state
                    ? theme.colors.whiteIcons
                    : theme.colors.greyIcons,
                }}
              >
                {t(updateTime)}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
