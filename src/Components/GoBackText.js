import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";

import { fS } from "../core/fonts";

import { theme, cardWidth } from "../core/theme";

export default GoBack = ({ text, actionText, onPress }) => {
	const { t, i18n } = useTranslation();

	return (
		<View
			style={{
				...cardWidth,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<TouchableOpacity onPress={onPress}>
				<Text
					style={{
						fontFamily: fS().Regular,
						fontSize: wp(4.37),
						color: theme.colors.textSecondary,
						textAlign: "center",
					}}
				>
					{t(text)}
					{
						<Text
							style={{
								fontFamily: fS().Bold,
								fontSize: wp(4.37),
								color: theme.colors.textSecondary,
								textAlign: "center",
								textDecorationLine: "underline",
							}}
						>
							{t(actionText)}
						</Text>
					}
				</Text>
			</TouchableOpacity>
		</View>
	);
};
