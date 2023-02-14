import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";

import { Formik } from "formik";
import { fS } from "../core/fonts";

import { theme, cardWidth } from "../core/theme";
export default function ErrorText({ text, errorState, errorMessage }) {
	const { t, i18n } = useTranslation();
	return (
		<View>
			{errorState ? (
				<>
					<Text
						style={{
							fontFamily: fS().Regular,
							fontSize: wp(3.7), //4.37
							color: theme.colors.error,
							textAlign: "center",
							...cardWidth,
						}}
					>
						{t(errorMessage)}
					</Text>
				</>
			) : (
				<></>
			)}
		</View>
	);
}
