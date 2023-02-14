import { StyleSheet, Text, View, FlatList } from "react-native";
import { useEffect, useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import
import FooterMenu from "../Components/FooterMenu";
import Device from "../Components/Device";
import Notifications from "../screens/Notifications";
import DeviceDetail from "../screens/DeviceDetail";
import SetSchedule from "../screens/SetSchedule";
import HomeScreen from "../screens/Home";
import Header from "../Components/Header";
import DeviceComponent from "../Components/DeviceComponent";

// import DeviceComponent from "../Components/DeviceComponent";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { subscribe, publish } from "../core/mqtt/pubsub";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { getUser, getDevicesbyUser } from "../API/UserDB";
import { GetShadow } from "../API/PubSub";

const Stack = createNativeStackNavigator();

export default HomeNav = ({ navigation }) => {
  const dispatch = useDispatch();
  navigation.setOptions({ tabBarVisible: false });
  return (
    // <HomeScreen />
    <Stack.Navigator
      screenListeners={({ navigation }) => ({
        focus: (e) => {
          // setCurrentTab(e.target);
          dispatch({ type: "CHANGE_SCREEN", payload: e.target });
          // console.log(e.target);
        },
      })}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeviceDetail"
        component={DeviceDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SetSchedule"
        component={SetSchedule}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
