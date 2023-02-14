import { StyleSheet, Text, View, FlatList } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
	theme,
	skeleton,
	cardWidth,
	homeskeleton,
	verticalBlankSpace,
} from "../core/theme";

// import
import Header from "../Components/Header";

// import DeviceComponent from "../Components/DeviceComponent";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default HomeScreen = ({ navigation }) => {
	return (
		<View style={styles.root}>
			<Header loading={true} navigation={navigation} />

			<View style={{ ...cardWidth, marginTop: hp(2.5) }}>
				<SkeletonPlaceholder
					backgroundColor={skeleton.backgroundColor}
					speed={skeleton.speed}
					direction={skeleton.direction}
					highlightColor={skeleton.highlightColor}
				>
					<View
						style={{ ...cardWidth, marginTop: hp(2.5), height: wp(5.35) }}
					></View>
				</SkeletonPlaceholder>

				<View
					style={{
						justifyContent: "space-around",
						alignItems: "center",
						...cardWidth,
					}}
				>
					<SkeletonPlaceholder
						backgroundColor={skeleton.backgroundColor}
						speed={skeleton.speed}
						direction={skeleton.direction}
						highlightColor={skeleton.highlightColor}
					>
						<View
							style={{
								...cardWidth,
								height: wp(38.92),
								alignItems: "center",
								justifyContent: "space-between",
							}}
						></View>
					</SkeletonPlaceholder>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		alignItems: "center",
		height: "100%",
		...verticalBlankSpace,
	},
});
