import { Text, TouchableOpacity, View } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { fS } from "../core/fonts";

import { Icon } from "react-native-elements";
import { theme, cardWidth, skeleton } from "../core/theme";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function SettingsCard({
	onPress,
	sKey,
	value,
	mainIcon,
	mainIconType,
	actionIcon,
	actionIconType,
	containerStyle,
	dualText,
	loading,
}) {
	const { t } = useTranslation();
	if (loading) {
		return (
			<SkeletonPlaceholder
				backgroundColor={skeleton.backgroundColor}
				speed={skeleton.speed}
				direction={skeleton.direction}
				highlightColor={skeleton.highlightColor}
			>
				<View
					style={{
						...cardWidth,
						height: hp(8.14),
						backgroundColor: theme.colors.filler,
						borderRadius: wp(2.91),
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "row",
						...containerStyle,
					}}
				></View>
			</SkeletonPlaceholder>
		);
	}
	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={{
					...cardWidth,
					height: hp(8.14),
					backgroundColor: theme.colors.filler,
					borderRadius: wp(2.91),
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "row",
					...containerStyle,
				}}
			>
				<View
					style={{
						width: "20%",
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Icon
						name={mainIcon}
						type={mainIconType}
						size={hp("2.6")}
						solid
						color={theme.colors.primary}
					/>
				</View>
				<View
					style={{
						width: "68%",
						height: "100%",
						justifyContent: "center",
						marginBottom: hp(0.37),
					}}
				>
					{dualText ? (
						<Text
							style={{
								fontFamily: fS().Light,
								fontSize: wp(3.89),
								color: theme.colors.textSecondary,
							}}
						>
							{t(sKey)}
						</Text>
					) : null}
					<Text
						style={{
							fontFamily: fS().Medium,
							fontSize: wp(4.86),
							color: theme.colors.textSecondary,
						}}
					>
						{t(value)}
					</Text>
				</View>
				<View
					style={{
						width: "13%",
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Icon
						name={actionIcon}
						type={actionIconType}
						size={hp("2.6")}
						solid
						color={theme.colors.greyIcons}
					/>
				</View>
			</View>
		</TouchableOpacity>
	);
}
