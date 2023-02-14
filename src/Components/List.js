import { Text, TouchableWithoutFeedback, View } from "react-native";
import { useState } from "react";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { fS } from "../core/fonts";

import { Icon } from "react-native-elements";
import { theme, cardWidth } from "../core/theme";

export default function List({
	onOptionChange,
	options,
	selectedOption,
	initialOption,
	containerStyle,
}) {
	const { t, i18n } = useTranslation();
	// console.log("Initial OPT: ", initialOption);
	const setOption = (n) => {
		onOptionChange(n.id);
	};

	const Item = ({ itemObj, lastItem }) => {
		return (
			<View
				key={itemObj.key}
				style={{
					height: "33.3333%",
					width: "100%",
					borderBottomWidth: lastItem ? 0 : 0.5,
					borderColor: theme.colors.greyIcons,
					justifyContent: "center",
					paddingHorizontal: wp(1),
					...containerStyle,
				}}
			>
				<TouchableWithoutFeedback
					style={{}}
					onPress={() => {
						setOption(itemObj);
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								fontSize: wp(4.86),
								fontFamily: fS().SemiBold,
								color: theme.colors.textSecondary,
							}}
						>
							{t(itemObj.value)}
						</Text>
						{itemObj.id === selectedOption ? (
							<Icon
								name={"check-circle"}
								type={"font-awesome-5"}
								size={hp("3")}
								solid
								color={theme.colors.success}
							/>
						) : null}
					</View>
				</TouchableWithoutFeedback>
			</View>
		);
	};
	return (
		<View
			style={{
				height: hp(20.05),
				...cardWidth,
				backgroundColor: theme.colors.filler,
				borderRadius: wp(3.64),
				alignItems: "center",
				justifyContent: "center",
				paddingHorizontal: wp(6),
			}}
		>
			{options.map((el, index) => {
				return (
					<Item
						itemObj={el}
						lastItem={options.length === index + 1 ? true : false}
					/>
				);
			})}
		</View>
	);
}
