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
  NativeModules,
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
import { getDevices } from "../core/redux";

const Stack = createNativeStackNavigator();

const ValidationSchema = yup.object().shape({
  otp: yup
    .string()
    .min(6, ({ min }) => `OTP must be ${min} digit long`)
    .max(6, ({ max }) => `OTP must be ${max} digit long`)
    .required("OTP is required"),
  device_name: yup
    .string()
    .required("Device name is required")
    .max(12, ({ max }) => `Device Name must not exceed ${max} characters`),
});

const SCAN = (props) => {
  const { t, i18n } = useTranslation();
  const [scanned, setScanned] = useState(false);
  const [QRValidationError, setQRValidationError] = useState(null);
  const [ReLinkModal, setRelinkModal] = useState(false);

  const {
    page,
    _onqrScan,
    qrValidationError,
    setDeviceLinked,
    goNext,
    goBack,
    resetForm,
    hasCameraPermission,
  } = props;

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    _onqrScan(data);
    // DO UI realted validations here
    checkDeviceExistance(data).then((res) => {
      if (res.error) {
        setQRValidationError("Something went wrong.");
      }
      if (!res.available) {
        setQRValidationError("Device could not be identified. Try again!");
      }
      if (res.registered) {
        // Set Rereg Modal
        setRelinkModal(true);
        setDeviceLinked(true);
        setQRValidationError("Device is already linked. Try another device!");
        // _onqrScan(data);
        // goNext
      } else if (res.available && !res.registered) {
        setQRValidationError(null);
        // _onqrScan(data);
        setDeviceLinked(false);
      }
    });
  };

  const _scanValidated = () => {
    if (QRValidationError == null && !scanned) {
      return false;
    }
    return true;
  };
  const _rescan = () => {
    setScanned(false);
    setQRValidationError(null);
  };

  const _handleModalButtonPress = (d) => {
    setRelinkModal(false);
    if (d.buttonIndex == 1) {
      // go next to page 2
      goNext(2);
      return;
    }
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
        {!_scanValidated() && hasCameraPermission && (
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
        )}

        <View
          style={{
            height: hp(40),
            width: wp(60),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {_scanValidated() && (
            <>
              <Icon
                name={QRValidationError ? "cancel" : "check-circle"}
                type={"material"}
                size={hp(13)}
                solid
                color={
                  QRValidationError ? theme.colors.error : theme.colors.success
                }
              />
              <ErrorText
                errorState={_scanValidated()}
                errorMessage={QRValidationError}
              />
            </>
          )}
        </View>
      </View>
      <View
        style={{
          paddingVertical: hp(6),
          alignItems: "center",
        }}
      >
        <Button
          title={"Next"}
          containerStyle={{ marginBottom: hp(1) }}
          onPress={() => {
            if (_scanValidated()) {
              goNext();
            }
          }}
        />
        <GoBackText
          text={"Want to scan again?"}
          actionText={"Rescan"}
          onPress={() => {
            _rescan();
          }}
        />
      </View>
      <EditableModal
        setModalVisible={setRelinkModal}
        modalVisible={ReLinkModal}
        Heading="Device Verification"
        onCancel={() => setRelinkModal(false)}
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
    </View>
  );
};

const VERIFY = ({
  // field: { otp, onBlur, onChange, value },
  // form: { errors, touched, setFieldTouched, setFieldValue },
  goBack,
  goNext,
  page,
  otp,
  onOTPChange,
  error,
  touched,
  setFieldTouched,
  onBlur,
  isValid,
  validateField,
}) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const hasError = error && touched;

  //  errors.otp !== undefined && touched.otp;

  const _otpValidate = () => {
    return otp.length < 6 ? false : true;
  };

  const _otpVerify = () => {
    setLoading(true);
    // Call otp verification API
    setLoading(false);
    return true;
  };
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
            goBack(1);
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
              onOTPChange(t);
            }}
            onResend={() => {
              console.log("Resend OTP Function call here");
            }}
            containerStyle={{ marginBottom: 10 }}
            loading={loading}
          />
        </TouchableWithoutFeedback>
        <ErrorText errorState={hasError} errorMessage={error} />
      </View>
      <Button
        // loading
        title={t("Verify")}
        containerStyle={{ marginBottom: hp(1) }}
        onPress={() => {
          setFieldTouched("otp");
          if (_otpValidate() && _otpVerify()) {
            if (otp.length == 6) {
              goNext();
            }
          }
        }}
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
          onPress={() => {
            goBack();
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const NAME = ({
  devicelinked,
  page,
  device_name,
  setDeviceName,
  goBack,
  goNext,
  error,
  touched,
  setFieldTouched,
  validateField,
  handleSubmit,
  ButtonRef,
  error_server,
  error_server_message,
}) => {
  const { t, i18n } = useTranslation();
  const hasError = error && touched;
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
            goBack(1);
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
          l
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
        value={device_name}
        keyboardType="default"
        maxLength={12}
        containerStyle={{ marginBottom: 1 }}
        onChangeText={(dn) => {
          setDeviceName(dn);
          setFieldTouched("device_name");
        }}
      />

      <ErrorText
        errorState={hasError || error_server}
        errorMessage={error || error_server_message}
      />

      <View
        style={{
          paddingVertical: hp(6),
          alignItems: "center",
        }}
      >
        <Button
          solid
          ref={ButtonRef}
          title={"Done"}
          containerStyle={{ marginBottom: hp(1) }}
          onPress={() => {
            if (!hasError) {
              //Create new device api
              handleSubmit();
            }
          }}
        />
      </View>
    </View>
  );
};

export default function Welcome({ navigation, route }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const ButtonRef = useRef();

  const [page, setPage] = useState(1);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [devicelinked, setDeviceLinked] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [ModalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    _requestAccess();
  }, []);
  const _requestAccess = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
    setModalVisibility(!(status === "granted"));
  };

  const backPressed = () => {
    setScanned(false);
  };

  const onDone = (deviceId, dname) => {
    ButtonRef.current.startLoading();
    RegisterDevice(deviceId, dname)
      .then((res) => {
        setErrorState(false);
        ButtonRef.current.stopLoading();
        // dispatch({ type: "DEVICE_REFRESH" });

        dispatch(getDevices());
        navigation.navigate("Home");
        setPage(1);
        backPressed();
      })
      .catch((err) => {
        setErrorState(true);
        setErrorMessage("Device could not be added. Try again!");
        ButtonRef.current.stopLoading();
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  // if (hasPermission === false) {
  // 	return <Text>No access to camera</Text>;
  // }

  const _handleModalButtonPress = (bdata) => {
    if (bdata.buttonTitle === "Retry") {
      _requestAccess();
    }
  };

  return (
    <View>
      <EditableModal
        setModalVisible={setModalVisibility}
        modalVisible={ModalVisibility}
        Heading="No Access"
        onCancel={() => {
          // Go to home page
          navigation.navigate("Home");
          setModalVisibility(false);
        }}
        buttonsArray={[{ title: "Retry", solid: true }]}
        onButtonPress={_handleModalButtonPress}
      >
        <Text style={styles.ModalBodyText}>
          {t(
            "Camera Access is not granted. Please allow the app to use Camera."
          )}
        </Text>
      </EditableModal>
      <Formik
        validationSchema={ValidationSchema}
        initialValues={{ device_id: "", otp: "", device_name: "" }}
        onSubmit={(values, actions) => {
          onDone(values.device_id, values.device_name);
          actions.resetForm();
          // NativeModules.DevSettings.reload();
          // navigation.navigate("Home");
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldTouched,
          resetForm,
          validateField,
          values,
          errors,
          touched,
          isValid,
          onBlur,
        }) => {
          const _resetForm = () => {
            resetForm();
          };
          const goNext = (pageNo) => {
            if (page === 3) {
              return;
            }
            if (pageNo) {
              setPage(pageNo);
              return;
            }
            if (page === 1 && !devicelinked) {
              setPage(page + 2);
              return;
            }
            setPage(page + 1);
          };

          const goBack = (pageNo) => {
            if (pageNo) {
              setPage(pageNo);
              return;
            }
            _resetForm();
            if (page === 1) {
              // reset page, and everything here
              navigation.navigate("Home");
              return;
            }
            setPage(page - 1);
          };
          return (
            <>
              {page === 1 ? (
                <SCAN
                  page={page}
                  _onqrScan={(deviceId) => {
                    if (!devicelinked) {
                      handleChange("otp")("111111");
                    }
                    handleChange("device_id")(deviceId);
                  }}
                  goNext={goNext}
                  goBack={goBack}
                  setDeviceLinked={setDeviceLinked}
                  resetForm={resetForm}
                  hasCameraPermission={hasPermission}
                />
              ) : page === 2 ? (
                <VERIFY
                  page={page}
                  goNext={goNext}
                  goBack={goBack}
                  otp={values.otp}
                  onOTPChange={handleChange("otp")}
                  error={errors.otp}
                  touched={touched.otp}
                  setFieldTouched={setFieldTouched}
                  validateField={validateField}
                  isValid={isValid}
                />
              ) : page === 3 ? (
                <NAME
                  devicelinked={devicelinked}
                  page={page}
                  goNext={goNext}
                  goBack={goBack}
                  device_name={values.device_name}
                  setDeviceName={handleChange("device_name")}
                  error={errors.device_name}
                  touched={touched.device_name}
                  error_server={errorState}
                  error_server_message={errorMessage}
                  setFieldTouched={setFieldTouched}
                  validateField={validateField}
                  handleSubmit={handleSubmit}
                  ButtonRef={ButtonRef}
                />
              ) : null}
            </>
          );
        }}
      </Formik>
    </View>
  );
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
