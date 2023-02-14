import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { SetLanguage, getToken } from "../core/asyncStorage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnimatedMultistep from "react-native-animated-multistep";

import * as yup from "yup";

import { Formik, Field, Form } from "formik";
import { fS } from "../core/fonts";

import { theme, cardWidth } from "../core/theme";

import List from "../Components/List";
import Button from "../Components/Button";
import Pagination from "../Components/ScreenPagination";
import Input from "../Components/Input";
import OTPInput from "../Components/OTPInput";
import ErrorText from "../Components/ErrorText";
import GoBackText from "../Components/GoBackText";
import { setLanguageDB, setLoginDB } from "../API/UserDB";

const Step4 = ({
  input,
  setInput,
  goNext,
  goBack,
  error,
  touched,
  setTouched,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            height: hp(31.07),
            width: wp(71.77),
          }}
          source={require("../../assets/195.jpg")}
        />
      </View>
      <View
        style={{
          ...cardWidth,
          paddingVertical: hp(5),
        }}
      >
        <Text style={styles.HeadTexts}>
          {t("I am Farmio, an assistant at your farm.")}
        </Text>

        <Text
          style={{
            fontSize: wp(5.83),
            fontFamily: fS().Bold,
            color: theme.colors.textSecondary,
            textAlign: "center",
          }}
        >
          {t("How about you?")}
        </Text>
      </View>
      <View style={{ marginBottom: hp(5) }}>
        <Input
          placeholder="Name"
          value={input}
          onChangeText={(i) => {
            setInput(i);
          }}
          keyboardType="default"
          maxLength={30}
          containerStyle={{ marginBottom: 10 }}
          onBlur={() => setTouched()}
        />
        <ErrorText errorState={error && touched} errorMessage={error} />
      </View>
      <Button
        title={t("Next")}
        containerStyle={{ marginBottom: hp(1) }}
        onPress={goNext}
      />
      <GoBackText
        text={"Want to change language? "}
        actionText={"Go Back"}
        onPress={goBack}
      />
    </View>
  );
};

export default function Welcome({ onLogin }) {
  const { t, i18n } = useTranslation();
  const Stack = createNativeStackNavigator();

  const schema = yup.object().shape({
    name: yup.string().required("Please, provide your name!"),
  });
  return (
    <Formik
      initialValues={{
        name: "",
      }}
      onSubmit={(values, s) => {
        console.log("Values", values);
      }}
      validationSchema={schema}
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
          <Step4
            input={values.name}
            setInput={handleChange("name")}
            goBack={goBack}
            goNext={() => {
              if (!values.name || errors.name) {
                handleSubmit();
                return;
              }
              handleSubmit();
            }}
            setTouched={() => setFieldTouched("name")}
            error={errors.name}
            touched={touched.name}
          />
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "white",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  HeadTexts: {
    fontSize: wp(5.83),
    fontFamily: fS().Bold,
    color: theme.colors.secondary,
    textAlign: "center",
    ...cardWidth,
  },
  subTexts: {},
});
