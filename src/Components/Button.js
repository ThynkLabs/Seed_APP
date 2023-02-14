import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	ActivityIndicator,
	Image,
	TextInput,
} from "react-native";
import {
	useEffect,
	useState,
	forwardRef,
	useRef,
	useImperativeHandle,
} from "react";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { GetLanguage, SetLanguage } from "../core/asyncStorage";
import FontProvider, {
	font,
	selectEnglish,
	fS,
	setFontLan,
} from "../core/fonts";

import { Icon, withBadge, Badge } from "react-native-elements";
import {
	theme,
	shadow2,
	shadow,
	shadowFooterMenu,
	cardWidth,
} from "../core/theme";

// width: wp(33.14),
// height: wp(10.63),
export default Button = forwardRef(
	({ containerStyle, solid, title, onPress, disable }, ref) => {
		const [loading, setLoading] = useState(false);
		const { t, i18n } = useTranslation();
		useImperativeHandle(ref, () => ({
			startLoading() {
				console.log("Loading Started");
				setLoading(true);
			},
			stopLoading() {
				console.log("Loading Stopped");
				setLoading(false);
			},
		}));
		return (
			<TouchableOpacity disabled={disable || loading} onPress={onPress}>
				<View
					style={{
						width: wp(32.14),
						height: wp(9.63),
						borderRadius: wp(1.21),
						borderWidth: solid ? 0 : 2,
						borderColor: disable
							? theme.colors.greyLineOutline
							: theme.colors.primary,
						backgroundColor: disable
							? theme.colors.filler
							: solid && theme.colors.primary,
						alignItems: "center",
						justifyContent: "space-evenly",
						flexDirection: "row",
						...containerStyle,
					}}
				>
					<Text
						style={{
							fontFamily: fS().Bold,
							fontSize: wp(4.37),
							color: disable
								? theme.colors.greyLineOutline
								: solid
								? theme.colors.whiteText
								: theme.colors.primary,
						}}
					>
						{t(title)}
					</Text>
					{loading && (
						<ActivityIndicator
							style={{ paddingHorizontal: 2 }}
							size="small"
							color={solid ? theme.colors.whiteIcons : theme.colors.primary}
						/>
					)}
				</View>
			</TouchableOpacity>
		);
	}
);
