import {
	StyleSheet,
	View,
	TextInput,
	Text,
	TouchableOpacity,
} from "react-native";
import { useState, useRef, useEffect, useCallback } from "react";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fS } from "../core/fonts";
import { theme, cardWidth, skeleton } from "../core/theme";
import { useTranslation } from "react-i18next";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function OTPInput({
	textChanged,
	containerStyle,
	done,
	onResend,
	loading,
}) {
	const { t, i18n } = useTranslation();
	const [timer, setTimer] = useState(60);
	const timeOutCallback = useCallback(
		() => setTimer((currTimer) => currTimer - 1),
		[]
	);
	const [otp, setOtp] = useState({
		o1: "",
		o2: "",
		o3: "",
		o4: "",
		o5: "",
		o6: "",
	});

	const o1 = useRef();
	const o2 = useRef();
	const o3 = useRef();
	const o4 = useRef();
	const o5 = useRef();
	const o6 = useRef();

	const changeText = (key, val) => {
		setOtp({ ...otp, [key]: val });
		let tempOtp = { ...otp, [key]: val };
		textChanged(
			tempOtp.o1 +
				tempOtp.o2 +
				tempOtp.o3 +
				tempOtp.o4 +
				tempOtp.o5 +
				tempOtp.o6
		);
	};

	const changePosition = (cp, np) => {
		np.current.focus();
	};

	useEffect(() => {
		timer > 0 && setTimeout(timeOutCallback, 1000);
	}, [timer, timeOutCallback]);

	const resetTimer = function () {
		// if (timer == 0) {
		setTimer(60);
		// }
	};

	const _resendPressed = () => {
		resetTimer();
		onResend();
	};
	if (loading) {
		return (
			<SkeletonPlaceholder
				backgroundColor={skeleton.backgroundColor}
				speed={skeleton.speed}
				direction={skeleton.direction}
				highlightColor={skeleton.highlightColor}
			>
				<View
					style={{
						...cardWidth,
						height: hp(8.52),
						justifyContent: "space-between",
						alignItems: "center",
						flexDirection: "row",
						...containerStyle,
					}}
				></View>
			</SkeletonPlaceholder>
		);
	}

	return (
		<View
			style={{
				...cardWidth,
				justifyContent: "center",
				alignItems: "flex-end",
				...containerStyle,
			}}
		>
			<View
				style={{
					...cardWidth,
					height: hp(8.52),
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "row",
					...containerStyle,
				}}
			>
				<View
					style={{
						width: wp(11.92),
						height: hp(8.52),
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: theme.colors.filler,
						borderRadius: wp(2.91),
					}}
				>
					<TextInput
						style={styles.otpTextInput}
						value={otp.o1}
						placeholder={"-"}
						placeholderTextColor={theme.colors.greyIcons}
						selectionColor={theme.colors.secondary}
						keyboardType={"numeric"}
						maxLength={1}
						onChangeText={(t) => {
							changeText("o1", t);
							if (otp.o1.length < 1) changePosition(o1, o2);
						}}
						ref={o1}
					></TextInput>
				</View>
				<View
					style={{
						width: wp(11.92),
						height: hp(8.52),
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: theme.colors.filler,
						borderRadius: wp(2.91),
					}}
				>
					<TextInput
						style={styles.otpTextInput}
						value={otp.o2}
						placeholder={"-"}
						placeholderTextColor={theme.colors.greyIcons}
						selectionColor={theme.colors.secondary}
						keyboardType={"numeric"}
						maxLength={1}
						onChangeText={(t) => {
							changeText("o2", t);
							if (otp.o2.length < 1) changePosition(o2, o3);
						}}
						ref={o2}
					></TextInput>
				</View>
				<View
					style={{
						width: wp(11.92),
						height: hp(8.52),
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: theme.colors.filler,
						borderRadius: wp(2.91),
					}}
				>
					<TextInput
						style={styles.otpTextInput}
						value={otp.o3}
						placeholder={"-"}
						placeholderTextColor={theme.colors.greyIcons}
						selectionColor={theme.colors.secondary}
						keyboardType={"numeric"}
						maxLength={1}
						onChangeText={(t) => {
							changeText("o3", t);
							if (otp.o3.length < 1) changePosition(o3, o4);
						}}
						ref={o3}
					></TextInput>
				</View>
				<View
					style={{
						width: wp(11.92),
						height: hp(8.52),
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: theme.colors.filler,
						borderRadius: wp(2.91),
					}}
				>
					<TextInput
						style={styles.otpTextInput}
						value={otp.o4}
						placeholder={"-"}
						placeholderTextColor={theme.colors.greyIcons}
						selectionColor={theme.colors.secondary}
						keyboardType={"numeric"}
						maxLength={1}
						onChangeText={(t) => {
							changeText("o4", t);
							if (otp.o4.length < 1) changePosition(o4, o5);
						}}
						ref={o4}
					></TextInput>
				</View>
				<View
					style={{
						width: wp(11.92),
						height: hp(8.52),
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: theme.colors.filler,
						borderRadius: wp(2.91),
					}}
				>
					<TextInput
						style={styles.otpTextInput}
						value={otp.o5}
						placeholder={"-"}
						placeholderTextColor={theme.colors.greyIcons}
						selectionColor={theme.colors.secondary}
						keyboardType={"numeric"}
						maxLength={1}
						onChangeText={(t) => {
							changeText("o5", t);
							if (otp.o5.length < 1) changePosition(o5, o6);
						}}
						ref={o5}
					></TextInput>
				</View>
				<View
					style={{
						width: wp(11.92),
						height: hp(8.52),
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: theme.colors.filler,
						borderRadius: wp(2.91),
					}}
				>
					<TextInput
						style={styles.otpTextInput}
						value={otp.o6}
						placeholder={"-"}
						placeholderTextColor={theme.colors.greyIcons}
						selectionColor={theme.colors.secondary}
						keyboardType={"numeric"}
						maxLength={1}
						onChangeText={(t) => {
							changeText("o6", t);
							if (otp.o6.length < 1) changePosition(o6, o1);
						}}
						ref={o6}
					></TextInput>
				</View>
			</View>
			<TouchableOpacity disabled={timer > 0} onPress={_resendPressed}>
				<Text
					style={{
						fontSize: wp(4),
						fontFamily: fS().Bold,
						textDecorationLine: timer > 0 ? null : "underline",
					}}
				>
					{timer > 0
						? t("Resend OTP in ") +
						  timer.toLocaleString("en-US", {
								minimumIntegerDigits: 2,
								useGrouping: false,
						  })
						: t("Resend OTP")}
					{/* {t("Resend OTP")} */}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	otpTextInput: {
		width: wp(11.92),
		alignSelf: "center",
		textAlign: "center",
		fontSize: wp(5.83),
		fontFamily: fS().Bold,
	},
});
