import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { theme } from "../core/theme";

export default function ArrowKeys({ onPress, last, blank, right }) {
	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
				width: wp(10.21),
				height: hp(6.14),
				borderWidth: blank ? 0 : 0.5,
				borderRadius: wp(2.67),
				borderColor: last
					? theme.colors.greyLineOutline
					: theme.colors.textSecondary,
			}}
		>
			{!blank && (
				<TouchableOpacity
					style={{
						justifyContent: "center",
						alignItems: "center",
						width: wp(10.21),
						height: hp(6.14),
					}}
					onPress={onPress}
				>
					{!blank && (
						<FontAwesomeIcon
							size={hp("2.3")}
							color={last ? theme.colors.greyIcons : theme.colors.textSecondary}
							icon={right ? "angle-right" : "angle-left"}
						/>
					)}
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
