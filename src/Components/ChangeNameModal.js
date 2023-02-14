import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { useEffect, useState, useMemo, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";

import { Formik } from "formik";
import { GetLanguage, SetLanguage } from "../core/asyncStorage";
import { useSelector, useDispatch } from "react-redux";
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

import * as yup from "yup";

import Modal from "../Components/Modal";
import Input from "../Components/Input";
import { setName } from "../API/UserDB";

import ErrorText from "./ErrorText";

export default function Settings({ changeNameModal, setChangeNameModal }) {
  const { t, i18n } = useTranslation();
  // const [user, setUser] = useState({});
  const [nameError, setNameError] = useState("");

  const ButtonRef = useRef();

  const dispatch = useDispatch();

  const { general } = useSelector((state) => {
    return state;
  });

  const { userRefresh, username } = general;

  // useMemo(() => {
  // 	setSettingsLoading(true);
  // 	getUser().then((user) => {
  // 		setUser(user);
  // 		setSettingsLoading(false);
  // 	});
  // }, [userRefresh]);

  const nameSchema = yup.object().shape({
    name: yup.string().required("Please, provide your name!"),
  });

  return (
    <Formik
      initialValues={{
        name: username,
      }}
      enableReinitialize={true}
      onSubmit={(values, s) => {
        ButtonRef.current.startLoading();
        setName(values)
          .then((response) => {
            dispatch({ type: "SET_USERNAME", payload: values.name });
            dispatch({ type: "USER_REFRESH" });
            ButtonRef.current.stopLoading();
          })
          .catch((e) => {
            dispatch({ type: "USER_REFRESH" });
            console.log(e);
          });
      }}
      validationSchema={nameSchema}
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
            Heading="Change Name"
            handleSubmit={handleSubmit}
            error={errors.name || nameError}
            bref={ButtonRef}
            onCancel={() => setChangeNameModal(false)}
          >
            <Input
              placeholder="Name"
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
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    height: "100%",
    ...verticalBlankSpace,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",

    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
