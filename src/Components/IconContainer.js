import { StyleSheet, View } from "react-native";

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { theme } from "../core/theme";

export default function IconContainer({
	icon,
	iconType,
	iconColor,
	invertBorder,
}) {
	return (
		<View
			style={{
				width: wp(10.94),
				height: wp(10.94),
				borderWidth: 0.3,
				borderRadius: wp(1.5),
				borderColor: invertBorder
					? theme.colors.whiteIcons
					: theme.colors.textSecondary,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Icon name={icon} type={iconType} size={wp(5.5)} color={iconColor} />
		</View>
	);
}
