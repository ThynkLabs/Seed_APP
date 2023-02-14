import { StyleSheet, View } from "react-native";

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { theme } from "../core/theme";

export default function IconContainer({ icon, iconType, iconColor }) {
	return (
		<View
			style={{
				width: wp(9.9),
				height: wp(9.9),
				borderWidth: 0.3,
				borderRadius: wp(1.5),
				borderColor: theme.colors.textSecondary,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Icon name={icon} type={iconType} size={wp(4.13)} color={iconColor} />
		</View>
	);
}
