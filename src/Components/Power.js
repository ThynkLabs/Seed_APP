import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fS } from "../core/fonts";

import { Icon } from "react-native-elements";
import { theme, shadow2 } from "../core/theme";
import { useTranslation } from "react-i18next";

export default function Power({
	source,
	phaseText,
	onStateChange,
	state,
	initialState,
}) {
	const { t, i18n } = useTranslation();
	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<View
				style={{
					backgroundColor: state
						? theme.colors.primary
						: theme.colors.background,
					// borderWidth: !image ? 0.5 : 0,
					width: hp(9.89),
					height: hp(9.89),
					borderRadius: wp(2.67),
					marginBottom: hp("0.6"),
					...shadow2,
				}}
			>
				<TouchableOpacity
					onPress={() => {
						onStateChange();
					}}
				>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							width: hp(9.89),
							height: hp(9.89),
							borderRadius: wp(2.67),
						}}
					>
						<Icon
							name={"power-settings-new"}
							type={"material"}
							size={wp(11.43)}
							solid
							color={state ? theme.colors.icons : theme.colors.primary}
						/>
					</View>
				</TouchableOpacity>
			</View>
			<Text
				style={{
					alignSelf: "center",
					fontFamily: fS().Bold,
					fontSize: wp(4.37),
					color: theme.colors.textSecondary,
				}}
			>
				{state ? t("ON_STATE") : t("OFF_STATE")}
			</Text>
		</View>
	);
}
