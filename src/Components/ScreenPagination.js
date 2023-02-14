import {
	StyleSheet,
	Button,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	ActivityIndicator,
	Image,
	TextInput,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontProvider, {
	font,
	selectEnglish,
	fS,
	setFontLan,
} from "../core/fonts";

import { Icon, withBadge, Badge } from "react-native-elements";
import { cardWidth, theme } from "../core/theme";

export default function Pagination({
	initialPage,
	screens,
	screensDone,
	containerStyle,
}) {
	const [Page, setPage] = useState(initialPage);

	const PageU = ({ complete, pg, screensDone }) => {
		return (
			<Icon
				name="circle"
				type="font-awesome-5"
				size={wp(3)}
				color={
					pg < screensDone + 1
						? theme.colors.primary
						: theme.colors.greyLineOutline
				}
				solid={true}
			/>
		);
	};
	return (
		<View
			style={{
				...cardWidth,
				alignSelf: "center",
				justifyContent: "space-around",
				flexDirection: "row",
				paddingHorizontal: wp(3),
				...containerStyle,
			}}
		>
			{screens.map((el) => {
				return <PageU key={el.key} pg={el.key} screensDone={screensDone} />;
			})}
		</View>
	);
}
