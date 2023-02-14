import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Formik } from "formik";
import { GetLanguage, SetLanguage } from "../core/asyncStorage";
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
import Phase from "../Components/PhaseCard";
import Power from "../Components/Power";
import ScheduleCard from "../Components/ScheduleCard";

import { subscribe, publish } from "../core/mqtt/pubsub";
import moment from "moment";
import { getSchedules } from "../core/redux";
import { GetSchedules, NewSchedule, DeleteSchedule } from "../API/Schedules";

export default function DeviceDetail({ navigation, route }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  // let mqttMessage = route.params.mqttMessage;
  const { general, device, schedule } = useSelector((state) => {
    return state;
  });
  const { mqttMessage, deviceRefresh } = general;
  const { devices, messages } = device;
  const { schedules, scheduleLoading = loading } = schedule;

  // const [phase, setPhase] = useState([0,0,0]);
  // console.log("mqttMessage: ", mqttMessage);
  // console.log("Current Device: ", route.params.currentDevice);
  const [Message, setMessage] = useState(mqttMessage);
  const [currentDevice, setCurrentDevice] = useState(
    devices[route.params.currentDevice]
  );
  const [currentIndex, setCurrentIndex] = useState(route.params.currentDevice);

  // const [schedule, setSchedule] = useState(devices[currentIndex].schedules);
  const [loading, setLoading] = useState(false);

  const Next = () => {
    if (currentIndex === devices.length - 1) {
      return;
    }
    setCurrentIndex(currentIndex + 1);
    setCurrentDevice(devices[currentIndex + 1]);
  };
  const Back = () => {
    if (currentIndex === 0) {
      navigation.goBack();
      return;
    }
    setCurrentIndex(currentIndex - 1);
    setCurrentDevice(devices[currentIndex - 1]);
  };

  const thisDeviceSchedules = schedules.find((s, i) => {
    return s.deviceId === currentDevice.deviceId;
  });

  const { shadow } = messages.find((s, i) => {
    return s.deviceId === currentDevice.deviceId;
  });
  const { delta, f_i } = shadow;

  // const IndexOfMqttMessage = mqttMessage.findIndex(
  // 	(el) => el.deviceId === currentDevice.deviceId
  // );

  // const phase = mqttMessage[IndexOfMqttMessage].shadow.f
  // 	.toString()
  // 	.split("")
  // 	.map((iNum) => parseInt(iNum, 10));
  // console.log(
  // 	mqttMessage[IndexOfMqttMessage].shadow.f
  // 		.toString()
  // 		.split("")
  // 		.map((iNum) => parseInt(iNum, 10))
  // );
  const delete_schedules = async (schID, devId) => {
    DeleteSchedule(schID, devId)
      .then(() => {
        dispatch(getSchedules());
      })
      .catch((e) => {
        console.log(e);
        console.log("DELETE SCHEDULE FAILED");
      });
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
        <ArrowKeys
          onPress={() => {
            Back();
          }}
        />
        <Text
          style={{
            fontSize: wp(5.35),
            fontFamily: fS().Bold,
            color: theme.colors.secondary,
            textAlign: "center",
            alignSelf: "center",
          }}
        >
          {t(currentDevice.deviceName)}
        </Text>
        <ArrowKeys
          right
          onPress={() => {
            Next();
          }}
        />
      </View>
      {/* <Text>{JSON.stringify(shadow)}</Text> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: hp(4),
          ...cardWidth,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: wp(4.86),
              fontFamily: fS().SemiBold,
              color: theme.colors.secondary,
              marginBottom: hp(0.7),
            }}
          >
            {t("Phase")}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Phase
              active={f_i[0] || 0}
              containerStyle={{ marginRight: wp(2) }}
              phaseText="R"
            />
            <Phase
              active={f_i[1] || 0}
              containerStyle={{ marginRight: wp(2) }}
              phaseText="Y"
            />
            <Phase active={f_i[2] || 0} phaseText="B" />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: wp(4.86),
              fontFamily: fS().SemiBold,
              color: theme.colors.secondary,
              marginBottom: hp(0.7),
              textAlign: "center",
            }}
          >
            {t("Control")}
          </Text>
          {/* <Power
						state={mqttMessage[IndexOfMqttMessage].shadow.p} // compare the device id from mqtt message and current device id to set the current device state only
						onStateChange={() => {
							// console.log("clicked", currentDevice.deviceId);
							if (currentDevice.deviceId)
								publish("update", currentDevice.deviceId, {
									state: {
										desired: { p: !mqttMessage[IndexOfMqttMessage].shadow.p },
									},
								});
						}}
					/> */}
          <Power
            state={delta.p} // compare the device id from mqtt message and current device id to set the current device state only
            onStateChange={() => {
              // console.log("clicked", currentDevice.deviceId);
              if (currentDevice.deviceId)
                publish("update", currentDevice.deviceId, {
                  state: {
                    desired: { p: !delta.p },
                  },
                });
            }}
          />
        </View>
      </View>
      <View style={{ ...cardWidth, marginTop: hp(2.5) }}>
        <Text
          style={{
            fontSize: wp(4.86),
            fontFamily: fS().SemiBold,
            color: theme.colors.secondary,
            marginBottom: hp(0.7),
          }}
        >
          {t("Schedule")}
        </Text>

        <View>
          {scheduleLoading ? (
            <ScheduleCard
              key={currentIndex}
              containerStyle={{ marginBottom: 10 }}
              onDelete={(e) => {
                console.log("Delete Schedule");
              }}
              loading={true}
            />
          ) : (
            <FlatList
              data={thisDeviceSchedules.schedules}
              ListEmptyComponent={() => {
                return (
                  <ScheduleCard
                    key={currentIndex}
                    containerStyle={{ marginBottom: 10 }}
                    onDelete={(e) => {
                      console.log("Delete Schedule");
                    }}
                    emptySchedule={true}
                    onEmptyScheduleClick={() => {
                      console.log("ADD SCHEDULE CLICKED");
                    }}
                  />
                );
              }}
              renderItem={(data) => {
                return (
                  <ScheduleCard
                    key={currentIndex}
                    data={data.item}
                    dualTimer={
                      data.item["startTime"] !== undefined &&
                      data.item["stopTime"] !== undefined
                        ? true
                        : false
                    }
                    dualTime={`${moment(data.item.startTime).format(
                      "h:mm A"
                    )}-${moment(data.item.stopTime).format("h:mm A")}`}
                    triggerDistance={
                      moment(data.item.startTime).format("DD-MM-YYYY") ===
                      moment().add(1, "days").format("DD-MM-YYYY")
                        ? "Tomorrow"
                        : moment(data.item.startTime).isSame(moment(), "days")
                        ? "Today"
                        : moment(data.item.startTime).format("DD-MM-YYYY")
                    }
                    // dualTime={`${format(new Date(2014, 1, 11), "hh:mm a", {
                    // 	locale: mr,
                    // })} to ${format(new Date(2014, 1, 11), "hh:mm a", {
                    // 	locale: mr,
                    // })}`}
                    // triggerDistance={formatDistance(
                    // 	new Date(2014, 1, 11),
                    // 	new Date(),
                    // 	{
                    // 		locale: mr,
                    // 	}
                    // )}
                    singleTime={
                      data.item["startTime"] !== undefined
                        ? moment(data.item.startTime).format("h:mm A")
                        : moment(data.item.stopTime).format("h:mm A")
                    }
                    singleTimeAction={data.item["startTime"] ? "ON" : "OFF"}
                    containerStyle={{ marginBottom: 10 }}
                    onDelete={(e) => {
                      // console.log(currentDevice.deviceId);
                      delete_schedules(e, currentDevice.deviceId);
                      // console.log("Delete Schedule");
                    }}
                  />
                );
              }}
              keyExtractor={(item) => item.scheduleId}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}

          {/* <ScheduleCard
						dualTimer={true}
						dualTime="1PM - 2PM"
						singleTime={"12AM"}
						singleTimeAction="OFF"
						containerStyle={{ marginBottom: 10 }}
						onDelete={(e) => {
							console.log("Delete Schedule");
						}}
					/> */}
        </View>
      </View>

      <View style={{ position: "absolute", bottom: 0, paddingVertical: hp(4) }}>
        <BottomFAB
          icon="add"
          text={"Add Schedule"}
          disabled={thisDeviceSchedules.schedules.length >= 10}
          onPress={() => {
            if (thisDeviceSchedules.schedules.length >= 10) {
              ToastAndroid.show(
                t("You have reached the limit of schedules per device."),
                ToastAndroid.SHORT
              );
            } else {
              navigation.navigate("SetSchedule", {
                initialScreen: 1,
                currentDeviceIndex: currentIndex,
              });
            }
          }}
          backgroundColor={theme.colors.success}
          textColor={theme.colors.success}
        />
      </View>
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
