import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fS } from "../core/fonts";

import { Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { theme, shadowFooterMenu } from "../core/theme";

export default function FooterMenu({
  onChangeItem,
  initialScreen,
  state,
  descriptors,
  navigation,
}) {
  const { t, i18n } = useTranslation();
  const [item, setItem] = useState(initialScreen);

  const changeItem = (i) => {
    if (i === item) return;
    setItem(i);
    navigation.navigate(i);
  };
  const { stackScreen } = useSelector((state) => {
    return state.general;
  });
  useEffect(() => {
    setItem(initialScreen);
  });
  return (
    <>
      {stackScreen === "Add Device-oDY_R3igYnyGaRUVEwlfY" ? null : (
        <View
          style={{
            width: wp(100),
            height: hp(8.39),
            // borderWidth: 0.5,
            ...shadowFooterMenu,
            // borderColor: theme.colors.greyIcons,
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: wp(6.08),
            borderTopRightRadius: wp(6.08),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            return (
              <TouchableWithoutFeedback
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
              >
                <View>
                  <Icon
                    name={
                      index === 0
                        ? "home"
                        : index === 1
                        ? "add"
                        : index === 2 && "settings"
                    }
                    type={"material"}
                    size={hp(3)}
                    solid={false}
                    color={
                      isFocused ? theme.colors.primary : theme.colors.secondary
                    }
                  />
                  <Text
                    style={{
                      ...styles.menuItemText,
                      color: isFocused
                        ? theme.colors.primary
                        : theme.colors.secondary,
                    }}
                  >
                    {t(label)}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
          {/* <TouchableWithoutFeedback
				onPress={() => {
					changeItem("Home");
				}}
			>
				<View>
					<Icon
						name={"home"}
						type={"material"}
						size={hp(3)}
						solid={false}
						color={
							item === "Home" ? theme.colors.primary : theme.colors.secondary
						}
					/>
					<Text
						style={{
							...styles.menuItemText,
							color:
								item === "Home" ? theme.colors.primary : theme.colors.secondary,
						}}
					>
						{t("Home")}
					</Text>
				</View>
			</TouchableWithoutFeedback>

			<TouchableWithoutFeedback
				onPress={() => {
					changeItem("AddDevice");
				}}
			>
				<View>
					<Icon
						name={"add"}
						type={"material"}
						size={hp(3)}
						solid
						color={
							item === "AddDevice"
								? theme.colors.primary
								: theme.colors.secondary
						}
					/>
					<Text
						style={{
							...styles.menuItemText,
							color:
								item === "AddDevice"
									? theme.colors.primary
									: theme.colors.secondary,
						}}
					>
						{t("Add Device")}
					</Text>
				</View>
			</TouchableWithoutFeedback>

			<TouchableWithoutFeedback
				onPress={() => {
					changeItem("Settings");
				}}
			>
				<View>
					<Icon
						name={"settings"}
						type={"material"}
						size={hp(3)}
						solid={false}
						color={
							item === "Settings"
								? theme.colors.primary
								: theme.colors.secondary
						}
					/>
					<Text
						style={{
							...styles.menuItemText,
							color:
								item === "Settings"
									? theme.colors.primary
									: theme.colors.secondary,
						}}
					>
						{t("Settings")}
					</Text>
				</View>
			</TouchableWithoutFeedback> */}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuItemText: {
    color: theme.colors.secondary,
    fontSize: wp(3.4),
    fontFamily: fS().Light,
  },
});
