import { Text, View } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";

import moment from "moment";

import { fS } from "../core/fonts";

import { theme, cardWidth } from "../core/theme";

export default function NotifCard({
	notificationText,
	notificationTitle,
	notificationTS,
	containerStyle,
}) {
	const { t, i18n } = useTranslation();
	return (
		<View
			style={{
				...cardWidth,
				backgroundColor: theme.colors.filler,
				borderRadius: wp(3.16),
				padding: wp(2.43),
				...containerStyle,
			}}
		>
			<View style={{}}>
				<Text
					style={{
						fontSize: wp(4),
						fontFamily: fS().Regular,
						color: theme.colors.textSecondary,
					}}
				>
					{notificationTitle}
				</Text>
				<Text
					style={{
						fontSize: wp(4),
						fontFamily: fS().Regular,
						color: theme.colors.textSecondary,
					}}
				>
					{notificationText}
				</Text>
			</View>
			<View
				style={{
					alignItems: "flex-end",
					alignSelf: "flex-end",
				}}
			>
				<Text
					style={{
						fontSize: wp(3.5),
						fontFamily: fS().Light,
						color: theme.colors.greyIcons,
					}}
				>
					{moment(new Date(notificationTS).getTime()).fromNow()}
				</Text>
			</View>
		</View>
	);
}
