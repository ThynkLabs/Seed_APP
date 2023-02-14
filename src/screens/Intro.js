import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
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

export default Intro = ({ submit }) => {
  const { t, i18n } = useTranslation();

  const schema = yup.object().shape({
    name: yup.string().required("Please, provide your name!"),
  });
  const initialIsValid = schema.isValidSync({
    name: "",
    phone: "",
    otp: "",
  });

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      onSubmit={(values, s) => {
        // console.log(values.name);
        submit(values);
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
                value={values.name}
                onChangeText={handleChange("name")}
                keyboardType="default"
                maxLength={30}
                containerStyle={{ marginBottom: 10 }}
                onBlur={() => setFieldTouched("name")}
              />
              {errors.name ? <ErrorText text={errors.name} /> : null}
            </View>
            <Button
              title={t("Done")}
              containerStyle={{ marginBottom: hp(1) }}
              onPress={() => {
                handleSubmit();
              }}
            />
            {/* <GoBackText
				text={"Want to change name? "}
				actionText={"Go Back"}
				onPress={goBack}
			/> */}
          </View>
        );
      }}
    </Formik>
  );
};

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
    backgroundColor: "white",
    height: "100%",
    flex: 1,
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
