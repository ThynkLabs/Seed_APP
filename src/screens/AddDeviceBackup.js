import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { GetLanguage, SetLanguage } from "../core/asyncStorage";
import FontProvider, {
  font,
  selectEnglish,
  fS,
  setFontLan,
} from "../core/fonts";

import { Icon } from "react-native-elements";
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
import StepGuide from "../Components/StepGuide";
import Button from "../Components/Button";
import GoBackText from "../Components/GoBackText";
import Input from "../Components/Input";
import ErrorText from "../Components/ErrorText";
import EditableModal from "../Components/EditableModal";
import OTPInput from "../Components/OTPInput";

import { BarCodeScanner } from "expo-barcode-scanner";

import BarcodeMask from "react-native-barcode-mask";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { checkDeviceExistance, RegisterDevice } from "../API/UserDB";

const Stack = createNativeStackNavigator();

const otpValidationSchema = yup.object().shape({
  otp: yup
    .string()
    .min(6, ({ min }) => `OTP must be ${min} digit long`)
    .max(6, ({ max }) => `OTP must be ${max} digit long`)
    .required("OTP is required"),
  device_name: yup
    .string()
    .max(12, ({ max }) => `Device Name must not exceed ${max} characters`)
    .required("Device name is required"),
});

const SCAN = ({
  scanned,
  handleBarCodeScanned,
  errState,
  errMessage,
  devicelinked,
  goNext,
  backPressed,
  navigation,
  page,
  rescanQR,
  ButtonRef,
}) => {
  const { t, i18n } = useTranslation();
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
            backPressed();
            navigation.navigate("Home");
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
          {t("Add Device")}
        </Text>
        <ArrowKeys blank />
      </View>
      <View
        style={{
          marginTop: hp(5),
          marginBottom: hp(5),
        }}
      >
        <StepGuide
          icon={"qr-code-scanner"}
          stepNumber={page}
          stepTitle={"Scan QR Code"}
        />
      </View>
      <View
        style={{
          height: hp(40),
        }}
      >
        {!scanned ? (
          <View>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.absoluteFillObject}
            />
            <BarcodeMask
              width={wp(50)}
              height={wp(50)}
              edgeColor={theme.colors.primary}
            />
          </View>
        ) : (
          <View
            style={{
              height: hp(40),
              width: wp(60),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Text>{scanData}</Text> */}
            <Icon
              name={errState ? "cancel" : "check-circle"}
              type={"material"}
              size={hp(13)}
              solid
              color={errState ? theme.colors.error : theme.colors.success}
            />
            <ErrorText text={errState ? errMessage : null} />
          </View>
        )}
        {/* </BarCodeScanner> */}
      </View>
      <View
        style={{
          paddingVertical: hp(6),
          alignItems: "center",
        }}
      >
        <Button
          ref={ButtonRef}
          loading={true}
          disable={
            scanned === false || errState === true || devicelinked === true
              ? true
              : false
          }
          title={"Next"}
          containerStyle={{ marginBottom: hp(1) }}
          onPress={() => {
            goNext();
          }}
        />
        <GoBackText
          text={"Want to scan again?"}
          actionText={"Rescan"}
          onPress={() => {
            rescanQR();
          }}
        />
      </View>
    </View>
  );
};

const NAME = ({
  goBack,
  devicelinked,
  page,
  changeDeviceName,
  deviceName,
  onDone,
  errState,
  errMessage,
  ButtonRef,
  errors,
  touched,
  isValid,
  setTouched,
}) => {
  const { t, i18n } = useTranslation();
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
            goBack();
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
          {t("Add Device")}
        </Text>
        <ArrowKeys blank />
      </View>
      <View
        style={{
          marginTop: hp(5),
          marginBottom: hp(5),
        }}
      >
        <StepGuide
          icon={"drive-file-rename-outline"}
          stepNumber={devicelinked ? page : page - 1}
          stepTitle={"Name the Device."}
        />
      </View>

      <Input
        placeholder="Device Name"
        value={deviceName}
        onChangeText={(dn) => {
          setTouched();
          changeDeviceName(dn);
        }}
        keyboardType="default"
        maxLength={12}
        containerStyle={{ marginBottom: 1 }}
      />
      {errState || (errors && touched) ? (
        <ErrorText text={errMessage || errors} />
      ) : null}
      <View
        style={{
          paddingVertical: hp(6),
          alignItems: "center",
        }}
      >
        <Button
          solid
          disable={(errors && touched) || deviceName.length < 1}
          ref={ButtonRef}
          title={"Done"}
          containerStyle={{ marginBottom: hp(1) }}
          onPress={() => {
            onDone(deviceName);
          }}
        />
      </View>
    </View>
  );
};

const VERIFY = ({
  goBack,
  page,
  otpChange,
  onVerify,
  errState,
  errMessage,
  errors,
  touched,
  isValid,
  setTouched,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.kView}
    >
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
            goBack();
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
          {t("Add Device")}
        </Text>
        <ArrowKeys blank />
      </View>
      <View
        style={{
          marginTop: hp(5),
          marginBottom: hp(5),
        }}
      >
        <StepGuide
          icon={"drive-file-rename-outline"}
          stepNumber={page}
          stepTitle={"Verify OTP"}
        />
      </View>

      <View
        style={{
          ...cardWidth,
          justifyContent: "center",
          marginBottom: hp(3),
        }}
      >
        <Text
          style={{
            ...styles.HeadTexts,
            marginBottom: hp(5),
            marginTop: hp(5),
          }}
        >
          {t(
            "An OTP has been sent to previously linked device. Please enter it here to proceed."
          )}
        </Text>
      </View>
      <View style={{ marginBottom: hp(4), justifyContent: "center" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <OTPInput
            textChanged={(t) => {
              setTouched();
              otpChange(t);
            }}
            onResend={() => {
              console.log("Resend OTP Function call here");
            }}
            containerStyle={{ marginBottom: 10 }}
          />
        </TouchableWithoutFeedback>
        {errState || (errors && touched) ? (
          <ErrorText text={errMessage || errors} />
        ) : null}
      </View>
      <Button
        solid
        disable={errors && touched}
        // loading
        title={t("Verify")}
        containerStyle={{ marginBottom: hp(1) }}
        onPress={onVerify}
      />
      <View
        style={{
          ...cardWidth,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GoBackText
          text={"Want to scan again?"}
          actionText={"Go Back"}
          onPress={goBack}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default function Welcome({ navigation, route }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const ButtonRef = useRef();

  const [page, setPage] = useState(1);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanData, setScanData] = useState();
  const [deviceName, setDeviceName] = useState("");
  const [devicelinked, setDeviceLinked] = useState(false);
  const [errState, setErrorState] = useState(false);
  const [errMessage, serErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [reRegModal, setReregModal] = useState(false);

  const [initialRouteName, setInitialRouteName] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const goNext = () => {
    if (page === 3) {
      return;
    }
    if (page === 1 && !devicelinked) {
      setPage(page + 2);
      return;
    }
    setPage(page + 1);
  };

  const _handleModalButtonPress = (buttondata) => {
    if (buttondata.buttonTitle === "YES") {
      // Go Next
      goNext();
      //close modal
      setReregModal(false);
    }
    if (buttondata.buttonTitle === "NO") {
      // Close Modal
      setReregModal(false);
    }
  };

  const goBack = () => {
    if (page === 1) {
      navigation.navigate("Home");
      return;
    }
    if (page === 3) {
      if (!devicelinked) {
        setPage(page - 2);
        return;
      }
      setPage(1);
      return;
    }
    setPage(page - 1);
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    checkDeviceExistance(data).then((res) => {
      if (res.error) {
        setErrorState(true);
        serErrorMessage("Something went wrong.");
        setScanned(true);
      }
      if (!res.available) {
        setErrorState(true);
        serErrorMessage("Device could not be identified. Try again!");
        setScanned(true);
      }
      if (res.registered) {
        setDeviceLinked(true);
        // Set Rereg Modal
        setErrorState(false);
        // serErrorMessage("Device is already linked. Try another code!");
        setReregModal(true);
      } else if (res.available && !res.registered) {
        setDeviceLinked(false);
        setErrorState(false);
      }
      setScanData(data);
    });
    // setScanData(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  const rescanQR = () => {
    setScanned(false);
    setErrorState(false);
  };

  const backPressed = () => {
    setScanned(false);
    setScanData(null);
    setInitialRouteName("ScanQR");
  };

  const onDone = (dname) => {
    ButtonRef.current.startLoading();
    setInitialRouteName("ScanQR");
    RegisterDevice(scanData, dname)
      .then((res) => {
        setErrorState(false);
        ButtonRef.current.stopLoading();
        dispatch({ type: "DEVICE_REFRESH" });
        navigation.navigate("Home");
        backPressed();
      })
      .catch((err) => {
        setErrorState(true);
        serErrorMessage("Device could not be added. Try again!");
        ButtonRef.current.stopLoading();
      });
  };

  const _verifyOtp = (otp) => {
    if (otp.length < 1) {
      setErrorState(true);
      serErrorMessage("OTP is required");
    } else {
      setErrorState(false);
      serErrorMessage("");
      goNext();
    }
    // Call Verification API
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      <EditableModal
        setModalVisible={setReregModal}
        modalVisible={reRegModal}
        Heading="Device Verification"
        onCancel={() => setReregModal(false)}
        buttonsArray={[
          { title: "NO", solid: false },
          { title: "YES", solid: true },
        ]}
        onButtonPress={_handleModalButtonPress}
      >
        <Text style={styles.ModalBodyText}>
          {t(
            "The device is linked with another account. Do you want to re-link the device to this account?"
          )}
        </Text>
      </EditableModal>
      <Formik
        validationSchema={otpValidationSchema}
        initialValues={{ device_id: "", otp: "", device_name: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldTouched,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            {page === 1 ? (
              <SCAN
                scanned={scanned}
                handleBarCodeScanned={(t, d) => {
                  handleBarCodeScanned(t, d);
                }}
                errState={errState}
                errMessage={errMessage}
                devicelinked={devicelinked}
                goNext={() => {
                  goNext();
                }}
                backPressed={() => {
                  backPressed();
                }}
                navigation={navigation}
                page={page}
                rescanQR={() => {
                  rescanQR();
                }}
                ButtonRef={ButtonRef}
              />
            ) : page === 2 ? (
              <VERIFY
                goBack={() => {
                  goBack();
                }}
                page={page}
                otpChange={handleChange("otp")}
                onVerify={() => {
                  // Verify if the otp is valid
                  // Go next if OTP verification Successfull
                  _verifyOtp(values.otp);

                  // Else Trigger error on failure
                }}
                errState={errState}
                errMessage={errMessage}
                errors={errors.otp}
                touched={touched.otp}
                isValid={isValid}
                setTouched={() => setFieldTouched("otp")}
              />
            ) : (
              <NAME
                goBack={() => {
                  goBack();
                }}
                page={page}
                changeDeviceName={handleChange("device_name")}
                deviceName={values.device_name}
                onDone={() => {
                  console.log(values);
                  console.log("ADD a new device here");
                }}
                errState={errState}
                errMessage={errMessage}
                devicelinked={devicelinked}
                ButtonRef={ButtonRef}
                errors={errors.device_name}
                touched={touched.device_name}
                isValid={isValid}
                setTouched={() => setFieldTouched("device_name")}
              />
            )}
          </>
        )}
      </Formik>
    </View>
  );

  // <Stack.Navigator initialRouteName={initialRouteName}>
  // 	<Stack.Screen
  // 		name="ScanQR"
  // 		component={SCAN}
  // 		options={{ headerShown: false }}
  // 	/>
  // 	{scanned && (
  // 		<Stack.Screen
  // 			name="NameDevice"
  // 			component={NAME}
  // 			options={{ headerShown: false }}
  // 		/>
  // 	)}
  // </Stack.Navigator>
}

const styles = StyleSheet.create({
  kView: {
    alignItems: "center",
    justifyContent: "space-evenly",
    ...verticalBlankSpace,
  },
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
  absoluteFillObject: {
    height: hp(40),
    width: wp(60),
  },
  ModalBodyText: {
    fontSize: wp(4.5),
    fontFamily: fS().Regular,
    color: theme.colors.secondary,
    marginBottom: hp(2.5),
    marginTop: hp(1),
    paddingHorizontal: hp(2.5),
    textAlign: "center",
    ...cardWidth,
  },
  HeadTexts: {
    fontSize: wp(5),
    fontFamily: fS().Medium,
    color: theme.colors.secondary,
    textAlign: "center",
    ...cardWidth,
  },
});
