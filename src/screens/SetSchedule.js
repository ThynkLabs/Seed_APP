import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useEffect, useState, useRef } from "react";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import DatePicker from "react-native-modern-datepicker";
// import NumberPlease from "react-native-number-please";
import DatePicker from "react-native-date-picker";
import { useSelector, useDispatch } from "react-redux";
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
import StepGuide from "../Components/StepGuide";
import Button from "../Components/Button";
import GoBackText from "../Components/GoBackText";
import Input from "../Components/Input";
import List from "../Components/List";
import ErrorText from "../Components/ErrorText";
import { setLanguage, getDevicesbyUser } from "../API/UserDB";
import { GetSchedules, NewSchedule, DeleteSchedule } from "../API/Schedules";
import { getSchedules } from "../core/redux";

export default function Welcome({ route, navigation }) {
	const dispatch = useDispatch();
	const dt = new Date();
	const startMinutes = new Date(dt.setMinutes(dt.getMinutes() + 2));
	const smt = new Date(startMinutes);
	const stopMinutes = new Date(smt.setMinutes(smt.getMinutes() + 2));

	const { t, i18n } = useTranslation();
	const [Page, setPage] = useState(route.params.initialScreen);
	const [StartTime, setStartTime] = useState(new Date(startMinutes));
	const [StopTime, setStopTime] = useState(new Date(stopMinutes));

	const [RepeatOption, setRepeatOption] = useState(1);
	const [Stat, setStat] = useState("ON");

	const initialTime = { hour: 1, min: 12, ap: 0 };
	const [Time, setBirtday] = useState(initialTime);

	const [language, SetLanguage] = useState("en");

	const { general, schedule, device } = useSelector((state) => {
		return state;
	});

	const { mqttMessage } = general;

	const { devices } = device;

	const currentDevice = devices[route.params.currentDeviceIndex];

	const ButtonRef = useRef();

	const date = [
		{ id: "hour", label: "", min: 1, max: 12 },
		{ id: "min", label: "", min: 0, max: 59 },
		{ id: "ap", label: "", min: 0, max: 1 },
	];

	useEffect(() => {
		GetLanguage().then((language) => {
			SetLanguage(language);
		});
	}, []);

	const new_schedule = async (obj) => {
		try {
			const ns = await NewSchedule(currentDevice.deviceId, obj);
			get_schedules();
			navigation.goBack();
			ButtonRef.current.stopLoading();
			return "OK";
		} catch (e) {
			console.log(e);
		}
	};

	const get_schedules = () => {
		dispatch(getSchedules());
	};

	const refresh = () => {
		setStartTime(new Date(startMinutes));
		setStopTime(new Date(stopMinutes));
	};

	const GoBack = () => {
		// console.log("PAGE: ", Page);
		if (Page === 1) {
			navigation.goBack();
		}
		if (Page === 3 && Stat === "OFF") {
			setPage(Page - 2);
		}
		if (Page === 2) {
			setPage(Page - 1);
		}
		if ((Page === 3 || 2) && Stat === "BOTH") {
			setPage(Page - 1);
		}
		//  else {
		// 	setPage(Page - 1);
		// }

		// console.log(Page - 1);
		// setPage(Page - 1);
	};
	const sdt = new Date(StartTime);

	const GoNext = () => {
		if (Page === 1 && Stat === "ON") {
			setPage(Page + 1);
		} else if (Page === 1 && Stat === "OFF") {
			setPage(Page + 2);
		} else if (
			(Page === 2 && Stat === "ON") ||
			(Page === 3 && (Stat === "OFF" || Stat === "BOTH"))
		) {
			// console.log("SUBMIT");
			// console.log(StartTime);
			new_schedule(
				Stat === "ON"
					? { startTime: StartTime }
					: Stat === "OFF"
					? { stopTime: StopTime }
					: { startTime: StartTime, stopTime: StopTime }
			);
		}
		// else if () {
		// 	console.log("SUBMIT");
		// }
		else if ((Page === 1 || 2) && Stat === "BOTH") {
			setPage(Page + 1);
		}

		// console.log(Page + 1);
	};

	return (
		<View style={styles.root}>
			{/* <DatePicker
				mode="datetime"
				date={new Date()}
				onDateChange={setStartTime}
				minimumDate={new Date()}
				maximumDate={new Date(dt.setDate(dt.getDate() + 7))}
				locale={"en"}
				is24hourSource={"device"}
				style={{
					...cardWidth,
				}}
				textColor={theme.colors.primary}
			/> */}
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
						GoBack();
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
					{t("Set Schedule")}
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
					icon={
						Page === 1
							? "toggle-on"
							: Page === 2
							? "hourglass-top"
							: Page === 3
							? "hourglass-bottom"
							: "repeat"
					}
					stepNumber={Page}
					stepTitle={
						Page === 1
							? "Action"
							: Page === 2
							? "Start Time"
							: Page === 3
							? "Stop Time"
							: "Repeat"
					}
				/>
			</View>
			{Page === 1 ? (
				<List
					options={[
						{ key: 1, id: "ON", value: "Turn ON" },
						{ key: 2, id: "OFF", value: "Turn OFF" },
						{ key: 3, id: "BOTH", value: "Do Both" },
					]}
					initialOption={Stat}
					onOptionChange={(selected) => {
						setStat(selected);
					}}
					selectedOption={Stat}
				/>
			) : Page === 2 ? (
				<View>
					<DatePicker
						mode="datetime"
						date={StartTime}
						onDateChange={setStartTime}
						minimumDate={new Date(startMinutes)}
						maximumDate={new Date(dt.setDate(dt.getDate() + 7))}
						locale={language}
						is24hourSource={"device"}
						style={{
							...cardWidth,
						}}
						fadeToColor="#fff"
						textColor={"black"}
					/>
					<ErrorText text={"Start time cannot be less than current time."} />
				</View>
			) : Page === 3 ? (
				<View>
					{/* <DatePicker
						mode="time"
						options={{
							backgroundColor: "#090C08",
							textHeaderColor: "#FFA25B",
							textDefaultColor: "#F6E7C1",
							selectedTextColor: "#fff",
							mainColor: "#F4722B",
							textSecondaryColor: "#D6C7A1",
							borderColor: "rgba(122, 146, 165, 0.1)",
						}}
						selected={new Date()}
						minuteInterval={3}
						onTimeChange={(selectedTime) => setStopTime(selectedTime)}
					/> */}
					<DatePicker
						mode="datetime"
						date={new Date(StopTime)}
						onDateChange={setStopTime}
						minimumDate={new Date(stopMinutes)}
						maximumDate={new Date(sdt.setDate(sdt.getDate() + 7))}
						locale={language}
						is24hourSource={"device"}
						style={{
							...cardWidth,
						}}
						fadeToColor="#fff"
						textColor={"black"}
					/>
					<ErrorText text={"Stop time cannot be less than current time."} />
				</View>
			) : (
				<List
					options={[
						{ key: 1, value: "Today" },
						{ key: 2, value: "Tomorrow" },
						{ key: 3, value: "Daily" },
					]}
					initialOption={1}
					onOptionChange={(selected) => {
						setRepeatOption(selected.key);
					}}
					selectedOption={RepeatOption}
				/>
			)}
			<View
				style={{
					paddingVertical: hp(6),
					alignItems: "center",
				}}
			>
				{(Stat === "ON" && Page === 2) ||
				(Stat === "OFF" && Page === 3) ||
				(Stat === "BOTH" && Page === 3) ? (
					<Button
						solid={true}
						title={"Done"}
						containerStyle={{ marginBottom: hp(1) }}
						onPress={() => {
							ButtonRef.current.startLoading();
							GoNext();
							// ButtonRef.current.stopLoading();
						}}
						ref={ButtonRef}
					/>
				) : (
					<Button
						title={"Next"}
						containerStyle={{ marginBottom: hp(1) }}
						onPress={GoNext}
					/>
				)}
				{/* <Button
					solid={
						(Stat === "ON" && Page === 2) ||
						(Stat === "OFF" && Page === 3) ||
						(Stat === "BOTH" && Page === 3)
							? true
							: false
					}
					title={
						(Stat === "ON" && Page === 2) ||
						(Stat === "OFF" && Page === 3) ||
						(Stat === "BOTH" && Page === 3)
							? "Done"
							: "Next"
					}
					containerStyle={{ marginBottom: hp(1) }}
					onPress={GoNext}
				/> */}
				{Page > 1 && (
					<GoBackText
						text={
							Page === 2
								? "Want to change action?"
								: Page === 3
								? "Want to change Start Time?"
								: Page === 4
								? "Want to change Stop Time?"
								: null
						}
						actionText={"Go Back"}
						onPress={GoBack}
					/>
				)}
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
	absoluteFillObject: {
		height: hp(40),
		width: wp(60),
	},
});
