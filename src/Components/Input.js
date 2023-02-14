import { View, TextInput, Text } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { fS } from "../core/fonts";

import { theme, cardWidth } from "../core/theme";

export default function Input({
	containerStyle,
	inputStyle,
	placeholder,
	value,
	onChangeText,
	keyboardType,
	maxLength,
	onBlur,
}) {
	const { t, i18n } = useTranslation();
	return (
		<View
			style={{
				...cardWidth,
				height: hp(8.52),
				backgroundColor: theme.colors.filler,
				borderRadius: wp(2.91),
				justifyContent: "center",
				alignItems: "center",
				...containerStyle,
			}}
		>
			<TextInput
				style={{
					textAlign: "center",
					fontSize: wp(5.37), //4.37
					fontFamily: fS().Regular,
					color: theme.colors.textSecondary,
					width: wp(70.02),
					height: hp(5.52),
					...inputStyle,
				}}
				onChangeText={onChangeText}
				value={value}
				placeholder={t(placeholder)}
				placeholderTextColor={theme.colors.greyIcons}
				selectionColor={theme.colors.secondary}
				keyboardType={keyboardType}
				maxLength={maxLength}
				onBlur={onBlur}
			/>
		</View>
	);
}
