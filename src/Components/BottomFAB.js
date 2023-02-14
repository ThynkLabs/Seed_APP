import { Text, TouchableOpacity, View } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { fS } from "../core/fonts";

import { Icon } from "react-native-elements";
import { theme } from "../core/theme";

export default function BottomFAB({
	icon,
	text,
	onPress,
	backgroundColor,
	textColor,
	disabled,
}) {
	const { t, i18n } = useTranslation();
	return (
		<View style={{ alignItems: "center" }}>
			<TouchableOpacity onPress={onPress}>
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						width: hp(6),
						height: hp(6),
						borderRadius: wp(50),
						marginBottom: hp(0.3),
						backgroundColor: disabled
							? theme.colors.backgroundSecondary
							: backgroundColor,
					}}
				>
					<Icon
						name={icon}
						type={"material"}
						size={wp(6.5)}
						solid
						color={disabled ? theme.colors.greyIcons : theme.colors.icons}
					/>
				</View>
			</TouchableOpacity>
			{text && (
				<Text
					style={{
						alignSelf: "center",
						fontFamily: fS().Medium,
						fontSize: wp(4),
						color: disabled ? theme.colors.greyIcons : textColor,
					}}
				>
					{t(text)}
				</Text>
			)}
		</View>
	);
}
