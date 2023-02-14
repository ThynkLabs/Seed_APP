import { StyleSheet, Text, View, FlatList } from "react-native";
import { useEffect, useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import moment from "moment";

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
import Notifications from "../screens/Notifications";
import DeviceDetail from "../screens/DeviceDetail";
import SetSchedule from "../screens/SetSchedule";
import Header from "../Components/Header";
import ChangeNameModal from "../Components/ChangeNameModal";
import Modal from "../Components/Modal";
import Input from "../Components/Input";
import ErrorText from "../Components/ErrorText";
import EditableModal from "../Components/EditableModal";

// import DeviceComponent from "../Components/DeviceComponent";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { subscribe, publish } from "../core/mqtt/pubsub";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { getUser, getDevicesbyUser } from "../API/UserDB";
import { GetShadow } from "../API/PubSub";
import { getSchedules, newMessage } from "../core/redux";
import { GetSchedules, NewSchedule, DeleteSchedule } from "../API/Schedules";

import { setDeviceName, deleteDevice } from "../core/redux";

import { basicPattern } from "../core/haptics";

import * as yup from "yup";
import { Formik } from "formik";

const deviceNameSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please, provide your name!")
    .max(12, "Device name cannot be more than 12 characters")
    .min(2, "Device name cannot be less than 2 characters"),
});

export default DeviceComponent = ({ data, index, navigation }) => {
  const [changeNameModal, setChangeNameModal] = useState(false);
  const [unregisterModal, setUnregisterModal] = useState(false);
  // const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  let currentIndex = index;
  const dispatch = useDispatch();
  const ButtonRef = useRef();

  const { general, device } = useSelector((state) => {
    return state;
  });
  const {
    deviceRefresh,
    refreshDeviceSubscription,
    deviceModifyMode,
    language,
  } = general;

  const { devices, messages, loading } = device;

  /**  GET INITIAL MQTT SHADOW STATE by FETCH
   *  and dispatch it to redux.
   *
   *
   *  **/
  const { shadow } = messages.find((s, i) => {
    return s.deviceId === data.deviceId;
  });
  const { delta, f_s, s, updatedAt } = shadow;

  const thisDeviceModify = deviceModifyMode === data.deviceId ? true : false;
  // useEffect(() => {
  // 	GetShadow(data.deviceId).then((dShadow) => {
  // 		const metap = dShadow.metadata.reported.p;
  // 		const metaf = dShadow.metadata.reported.f;
  // 		console.log(metap);
  // 		setDeltaMessage(dShadow.state.desired);
  // 		setPhase(dShadow.state.desired.f);
  // 		setUpdated(
  // 			metap.timestamp > metaf.timestamp
  // 				? moment(metap.timestamp * 1000).fromNow()
  // 				: moment(metaf.timestamp * 1000).fromNow()
  // 		);
  // 		dispatch({
  // 			type: "SET_MQTT",
  // 			payload: { deviceId: data.deviceId, shadow: dShadow.state.desired },
  // 		});
  // 		setLoading(false);
  // 	});
  // }, [deviceRefresh]);

  const _onModifyMode = () => {
    basicPattern();
    dispatch({ type: "SET_DEVICE_MODIFY_MODE", payload: data.deviceId });
  };
  const _onNormalMode = () => {
    dispatch({ type: "SET_DEVICE_MODIFY_MODE", payload: "" });
  };

  const _editDevice = () => {
    // set Edit Modal
    setChangeNameModal(true);
  };

  const _deleteDevice = () => {
    //set Delete Modal
    setUnregisterModal(true);
  };

  useEffect(() => {
    const sub = subscribe(data.deviceId, {
      onMessage: (msg) => {
        // if (msg.topic.includes(data.deviceId) && msg.topic.includes("delta")) {
        // 	setDeltaMessage(msg.message.state.p);
        // }
        if (
          msg.topic.includes(data.deviceId) &&
          msg.topic.includes("update/documents")
        ) {
          dispatch(newMessage(msg, data.deviceId));
          // console.log(msg.message.current.metadata.reported.p.timestamp);
          // console.log(msg.message.current.metadata.reported.f.timestamp);
          // const metap = msg.message.current.metadata.reported.p.timestamp;
          // const metaf = msg.message.current.metadata.reported.f.timestamp;
          // setUpdated(
          // 	metap >= metaf
          // 		? moment(metap * 1000).toNow()
          // 		: moment(metaf * 1000).toNow()
          // );
          // console.log("PREV: ", msg.message.current.state.desired.p);
          // console.log("CURR: ", msg.message.previous.state.desired.p);
          // setDeltaMessage(msg.message.current.state.desired);
          // setPhase(msg.message.current.state.desired.f);
          // dispatch({
          // 	type: "SET_MQTT",
          // 	payload: {
          // 		deviceId: data.deviceId,
          // 		shadow: msg.message.current.state.desired,
          // 	},
          // });
        }
      },
      onError: (msg) => {
        console.log(msg);
      },
    });
    return function cleanup() {
      // console.log("UNSUB Triggered");
      sub.unsubscribe();
    };
  }, [devices]);

  useEffect(() => {
    dispatch(getSchedules());
  }, []);
  // useEffect(() => {
  // publish("get", "kilVvj", { msg: "" });
  // }, []);

  const _handleModalButtonPress = (options) => {
    if (options.buttonTitle == "YES") {
      dispatch(deleteDevice(data.deviceId));
    }
    _onNormalMode();
    setUnregisterModal(false);
  };
  return (
    <View>
      <EditableModal
        setModalVisible={setUnregisterModal}
        modalVisible={unregisterModal}
        Heading="Delete Device"
        onCancel={() => setUnregisterModal(false)}
        buttonsArray={[
          { title: "YES", solid: false },
          { title: "CANCEL", solid: true },
        ]}
        onButtonPress={_handleModalButtonPress}
      >
        <Text style={styles.ModalBodyText}>
          {t("Do you really want to delete the device ") +
            `"${data.deviceName}"` +
            t(" from this account?")}
        </Text>
      </EditableModal>
      <Formik
        initialValues={{
          name: data.deviceName,
        }}
        enableReinitialize={true}
        onSubmit={(values, s) => {
          ButtonRef.current.startLoading();
          dispatch(setDeviceName(data.deviceId, values.name));
          ButtonRef.current.stopLoading();
          setChangeNameModal(false);
          _onNormalMode();
        }}
        validationSchema={deviceNameSchema}
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
              setModalVisible={setChangeNameModal}
              modalVisible={changeNameModal}
              Heading="Change Device Name"
              handleSubmit={handleSubmit}
              error={errors.name}
              bref={ButtonRef}
              onCancel={() => setChangeNameModal(false)}
            >
              <Input
                placeholder="Device Name"
                value={values.name}
                onChangeText={handleChange("name")}
                keyboardType="default"
                maxLength={30}
                containerStyle={{
                  marginTop: hp(2),
                  marginBottom: hp(1),
                  width: cardWidth.width - hp(4),
                }}
              />
              <ErrorText errorState={errors.name} errorMessage={errors.name} />
            </Modal>
          );
        }}
      </Formik>
      <Device
        loading={loading}
        online={s}
        state={delta.p}
        key={data}
        modifyMode={thisDeviceModify}
        onCancelEditMode={_onNormalMode}
        updateTime={
          language === "en"
            ? `${t("updated")} ${updatedAt}`
            : `${updatedAt} ${t("updated")} `
        }
        deviceName={data.deviceName}
        onToggle={(e) => {
          // console.log("Device State: ", e);
          publish("update", data.deviceId, { state: { desired: { p: e } } });
          // setDeltaMessage(e);
        }}
        onPress={(e) => {
          navigation.navigate("DeviceDetail", {
            currentDevice: currentIndex,
            currentDeviceId: data.deviceId,
            mqttMessage: delta,
          });
        }}
        onLongPress={() => {
          _onModifyMode();
        }}
        onPressEdit={_editDevice}
        onPressDelete={_deleteDevice}
        delayLongPress={500}
        cardStyle={{
          margin: hp(1),
        }}
        initialRender
        initialRenderFunction={() => {}}
        icon="faucet"
        iconType="font-awesome-5"
      />
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
