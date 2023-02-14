import { Text, View, TouchableOpacity } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { fS } from "../core/fonts";

import { Icon } from "react-native-elements";
import { theme, cardWidth, skeleton } from "../core/theme";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
// Require Esperanto locale

export default function ScheduleCard({
	dualTimer,
	data,
	dualTime,
	singleTimeAction,
	singleTime,
	containerStyle,
	onDelete,
	loading,
	emptySchedule,
	onEmptyScheduleClick,
	triggerDistance,
}) {
	const { t, i18n } = useTranslation();
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
						height: hp(8.14),
						backgroundColor: theme.colors.filler,
						borderRadius: wp(2.91),
						justifyContent: "center",
						alignItems: "center",
						...containerStyle,
						...cardWidth,
					}}
				></View>
			</SkeletonPlaceholder>
		);
	}

	if (emptySchedule) {
		return (
			<View
				style={{
					height: hp(8.14),
					backgroundColor: theme.colors.filler,
					borderRadius: wp(2.91),
					justifyContent: "center",
					alignItems: "center",
					...containerStyle,
					...cardWidth,
				}}
			>
				<TouchableOpacity onPress={onEmptyScheduleClick}>
					<Icon
						name={"clock"}
						type={"font-awesome-5"}
						size={hp("2.6")}
						color={theme.colors.greyIcons}
					/>
					<Text
						style={{
							fontFamily: fS().Medium,
							fontSize: wp(3.5),
							color: theme.colors.greyIcons,
						}}
					>
						{t("Nothing is scheduled.")}
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
	return (
		<View
			style={{
				height: hp(8.14),
				backgroundColor: theme.colors.filler,
				borderRadius: wp(2.91),
				justifyContent: "center",
				flexDirection: "row",
				...containerStyle,
				...cardWidth,
			}}
		>
			<View
				style={{
					width: "5%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
				}}
			></View>

			{dualTimer && (
				<View
					style={{
						width: "45%",
						height: "100%",
						justifyContent: "center",
					}}
				>
					<Text
						style={{
							fontFamily: fS().Medium,
							fontSize: wp(4.86),
							color: theme.colors.textSecondary,
						}}
					>
						{t(dualTime)}
					</Text>
				</View>
			)}
			{!dualTimer && (
				<>
					<View
						style={{
							width: "22.5%",
							height: "100%",
							justifyContent: "center",
						}}
					>
						<Text
							style={{
								fontFamily: fS().Medium,
								fontSize: wp(4.86),
								color: theme.colors.textSecondary,
							}}
						>
							{t(singleTimeAction)}
						</Text>
					</View>
					<View
						style={{
							width: "22.5%",
							height: "100%",
							justifyContent: "center",
						}}
					>
						<Text
							style={{
								fontFamily: fS().Medium,
								fontSize: wp(4.86),
								color: theme.colors.textSecondary,
							}}
						>
							{t(singleTime)}
						</Text>
					</View>
				</>
			)}

			<View
				style={{
					width: "37%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						fontFamily: fS().Medium,
						fontSize: wp(4.86),
						color: theme.colors.greyIcons,
					}}
				>
					{t(triggerDistance)}
				</Text>
			</View>
			<View
				style={{
					width: "13%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
					alignSelf: "flex-end",
				}}
			>
				<TouchableOpacity onPress={() => onDelete(data.scheduleId)}>
					<Icon
						name={"trash-alt"}
						type={"font-awesome-5"}
						size={hp("2.6")}
						solid
						color={theme.colors.error}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}
