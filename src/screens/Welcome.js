import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { SetLanguage, getToken } from "../core/asyncStorage";
import { Auth } from "@aws-amplify/auth";
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
import { setLanguageDB, setLoginDB, setName } from "../API/UserDB";
const Step1 = ({ input, setInput, inputChange, goNext, goBack }) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.HeadTexts, marginBottom: hp(5) }}>
        {t("Please select your default language.")}
      </Text>
      <View style={{ marginBottom: hp(5) }}>
        <List
          options={[
            { key: 1, id: "en", value: "English" },
            { key: 2, id: "hi", value: "Hindi" },
            { key: 3, id: "mr", value: "Marathi" },
          ]}
          initialOption={input}
          onOptionChange={(selected) => {
            setInput(selected);
            i18n
              .changeLanguage(selected)
              .then(() => {
                SetLanguage(selected);
              })
              .catch((err) => console.log(err));
          }}
          selectedOption={input}
          containerStyle={{
            width: cardWidth.width - hp(4),
          }}
        />
      </View>
      <Button
        title={t("Next")}
        onPress={() => {
          if (!input) {
            return;
          }
          goNext();
        }}
        containerStyle={{ marginBottom: hp(1) }}
      />
    </View>
  );
};

const Step2 = ({
  input,
  setInput,
  goNext,
  goBack,
  error,
  name,
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
        {/* <Image
					style={{
						height: hp(31.07),
						width: wp(71.77),
					}}
					source={require("../../assets/195.jpg")}
				/> */}
      </View>
      <View
        style={{
          ...cardWidth,
          justifyContent: "center",
          marginBottom: hp(3),
        }}
      >
        <Text style={styles.HeadTexts}>
          {t("Hello, ")}
          {t(name)}
          {"\n"}
          {"\n"}
        </Text>

        <Text style={styles.HeadTexts}>
          {t("Please enter your phone number.")}
        </Text>
      </View>
      <View style={{ marginBottom: hp(4), justifyContent: "center" }}>
        <Input
          placeholder="Phone"
          value={input}
          onChangeText={(i) => {
            setInput(i);
          }}
          keyboardType="numeric"
          maxLength={30}
          containerStyle={{ marginBottom: 10 }}
          onBlur={() => setTouched()}
        />

        {error ? <ErrorText text={error} /> : null}
      </View>
      <Button
        title={t("Next")}
        onPress={goNext}
        containerStyle={{ marginBottom: hp(1) }}
      />
      <View
        style={{
          ...cardWidth,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GoBackText
          text={"Want to change your name? "}
          actionText={"Go Back"}
          onPress={goBack}
        />
      </View>
    </View>
  );
};

const Step3 = ({
  input,
  setInput,
  goNext,
  goBack,
  error,
  touched,
  setTouched,
  ButtonRef,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.container}>
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
          {t("I have sent an OTP on your phone number. Please enter it below.")}
        </Text>
      </View>
      <View style={{ marginBottom: hp(4), justifyContent: "center" }}>
        <OTPInput
          textChanged={(t) => {
            setInput(t);
          }}
          onResend={() => {
            console.log("Resend OTP Function call here");
          }}
          containerStyle={{ marginBottom: 10 }}
        />
        <ErrorText errorState={error && touched} errorMessage={error} />
      </View>
      <Button
        solid
        // disable
        // loading={otpValidating}
        ref={ButtonRef}
        title={t("Done")}
        containerStyle={{ marginBottom: hp(1) }}
        onPress={() => {
          setTouched();
          goNext();
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
          text={"Want to change phone number? "}
          actionText={"Go Back"}
          onPress={goBack}
        />
      </View>
    </View>
  );
};

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
  const [Page, setPage] = useState(1);
  const [lang, setLang] = useState("en");
  const [lErrors, setLErrors] = useState({
    error: null,
    message: "",
  });
  const [otpError, setOtpError] = useState("");
  const [otpValidating, setOtpValidating] = useState(false);
  const [validationCount, setValidationCount] = useState(1);
  const [user, setUser] = useState({});

  const ButtonRef = useRef();
  const setLoginError = (m) => {
    setLErrors({ error: true, message: m });
  };
  const setNoError = () => {
    setLErrors({ error: false, message: "" });
  };

  const userExist = async (phone_number) => {
    try {
      const user = await Auth.signIn(phone_number);
      return user;
    } catch (error) {
      console.log("error signing in", error);
      return false;
    }
  };

  async function signIn(phone_number) {
    try {
      const user = await Auth.signIn(phone_number);
      return user;
    } catch (error) {
      console.log("error signing in", error);
      return false;
    }
  }
  async function signUp(username) {
    try {
      const user = await Auth.signUp({
        username: username,
        password: "Krishi@12345",
        attributes: {
          // optional
          phone_number: username,
        },
      });
      return true;
    } catch (error) {
      console.log("error signing up", error);
      return false;
    }
  }

  async function Validate(user, otp) {
    if (validationCount > 2) {
      setOtpError("Max attempts made. Please try again later.");
      ButtonRef.current.stopLoading();
      return false;
    }
    try {
      const cognitoUser = await Auth.sendCustomChallengeAnswer(user, otp);
      console.log("VALIDATION:", cognitoUser);

      ButtonRef.current.stopLoading();
      if (!cognitoUser.signInUserSession) {
        setOtpError(
          `OTP could not be verified. ${3 - validationCount} attempts left.`
        );
        setValidationCount(validationCount + 1);
        return false;
      }
      return true;
    } catch (e) {
      console.log("VALIDATION ERR:", e);
      // Handle 3 error thrown for 3 incorrect attempts.
      setValidationCount(validationCount + 1);

      ButtonRef.current.stopLoading();
      return false;
    }
  }

  const schema = yup.object().shape({
    name: yup.string().required("Please, provide your name!"),
    phone: yup.string().required().min(10).max(10),
    otp: yup
      .string()
      .min(6)
      .max(6, "OTP should not excced 6 chars.")
      .required("OTP is required ."),
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
        phone: "",
        otp: "",
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
        const goNext = (key) => {
          if (
            (key === "phone" && errors.phone) ||
            (key === "otp" && errors.otp) ||
            (key === "name" && errors.name)
            // (Page === (2 || 3 || 4) && errors.name) ||
            // (Page === (2 || 3 || 4) && errors.name && !touched)
          ) {
            // console.log("ERROR");
            return;
          }
          if (key === "phone") {
            // signUp("+91-" + values.phone);
            // signIn("+91-" + values.phone);
            SetLanguage(lang);
            userExist("+91" + values.phone).then((t) => {
              getToken().then((token) => {
                if (!t) {
                  // console.log("User does not exist");
                  signUp("+91" + values.phone).then((signed) => {
                    // console.log("SIGNED:", signed);
                    if (signed) {
                      signIn("+91" + values.phone).then((login) => {
                        if (login) {
                          // console.log("LOGIN", login);
                          setPage(Page + 1);
                          setUser(login);
                          setLanguageDB({ language: lang });
                          setLoginDB(
                            "login",
                            login.challengeParam.USERNAME,
                            token
                          );
                        } else {
                          setLoginError("Something went wrong.");
                          setUser("");
                        }
                      });
                    }
                  });
                } else {
                  setPage(Page + 1);
                  setUser(t);
                  setLanguageDB({ language: lang });
                  setLoginDB("login", t.challengeParam.USERNAME, token);
                  // console.log("User exist");
                  // signIn("+91" + values.phone).then((login) => {
                  // 	if (login) {
                  // 		console.log("SIGIN", login.challengeParam);
                  // 		setPage(Page + 1);
                  // 		setUser(login);
                  // 		setLanguageDB({ language: lang });
                  // 		setLoginDB("login", login.challengeParam.USERNAME);
                  // 	} else {
                  // 		setLoginError("Something went wrong.");
                  // 		setUser("");
                  // 	}
                  // });
                }
              });
            });
            // userExist("+91-" + values.phone);
          }
          if (key === "otp") {
            ButtonRef.current.startLoading();
            if (Validate(user, values.otp)) {
              setName({ name: values.name });
            }
          } else {
            setPage(Page + 1);
          }
        };
        const goBack = () => {
          handleChange("otp", "");
          setPage(Page - 1);
        };
        return (
          <View style={styles.root}>
            {Page === 1 ? (
              <Step1
                input={lang}
                setInput={setLang}
                goBack={goBack}
                goNext={goNext}
              />
            ) : Page === 2 ? (
              <Step2
                input={values.phone}
                name={values.name}
                setInput={handleChange("phone")}
                goBack={goBack}
                goNext={() => {
                  if (!values.phone || errors.phone) {
                    // handleSubmit();
                    return;
                  }
                  goNext("phone");
                  // handleSubmit();
                }}
                error={errors.phone}
                touched={touched.phone}
                setTouched={() => setFieldTouched("phone")}
              />
            ) : Page === 3 ? (
              <Step3
                input={values.otp}
                ButtonRef={ButtonRef}
                setInput={handleChange("otp")}
                goBack={goBack}
                goNext={() => {
                  // console.log(values.otp);
                  if (!values.otp || errors.otp) {
                    // handleSubmit();
                    return;
                  }
                  // console.log("OTP:", values.otp);
                  handleSubmit();
                  goNext("otp");
                }}
                error={errors.otp || otpError}
                touched={touched.otp}
                setTouched={() => setFieldTouched("otp")}
              />
            ) : Page === 4 ? (
              <Step4
                input={values.name}
                setInput={handleChange("name")}
                goBack={goBack}
                goNext={() => {
                  if (!values.name || errors.name) {
                    // handleSubmit();
                    return;
                  }
                  goNext("name");
                  // handleSubmit();
                }}
                setTouched={() => setFieldTouched("name")}
                error={errors.name}
                touched={touched.name}
              />
            ) : null}
          </View>
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
