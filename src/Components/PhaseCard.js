import { Text, View } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fS } from "../core/fonts";
import { theme, shadow } from "../core/theme";

export default function Phase({
	phaseText,
	cardStyle,
	containerStyle,
	active,
}) {
	return (
		<View style={{ flexDirection: "row" }}>
			<View
				style={{
					alignItems: "center",
					...containerStyle,
				}}
			>
				<View
					style={{
						height: hp(9.89),
						width: wp(7.78),
						backgroundColor:
							active == "0"
								? theme.colors.backgroundSecondary
								: phaseText === "R"
								? theme.colors.error
								: phaseText === "Y"
								? theme.colors.warning
								: theme.colors.info,
						borderRadius: wp(2.91),
						marginBottom: hp("0.6"),
						...shadow,
						...cardStyle,
					}}
				></View>
				<Text
					style={{
						alignSelf: "center",
						fontFamily: fS().Bold,
						fontSize: wp(4.37),
						color: theme.colors.textSecondary,
					}}
				>
					{phaseText}
				</Text>
			</View>
		</View>
	);
}
