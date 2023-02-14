import { Text, View } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { fS } from "../core/fonts";

import { Icon } from "react-native-elements";
import { theme } from "../core/theme";
export default function StepGuide({ stepNumber, stepTitle, onPress, icon }) {
	const { t, i18n } = useTranslation();
	return (
		<View style={{ alignItems: "center" }}>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					width: wp(19.95),
					height: wp(19.95),
					backgroundColor: theme.colors.filler,
					borderRadius: wp(100),
					marginBottom: hp(1.25),
				}}
			>
				<Icon
					name={icon}
					type={"material"}
					size={wp(9)}
					solid
					color={theme.colors.primary}
				/>
			</View>
			<Text
				style={{
					alignSelf: "center",
					fontFamily: fS().Regular,
					fontSize: wp(4.37),
					color: theme.colors.textSecondary,
				}}
			>
				{stepNumber}
				{". "}
				{t(stepTitle)}
			</Text>
		</View>
	);
}
