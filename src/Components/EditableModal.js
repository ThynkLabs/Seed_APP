import {
	StyleSheet,
	Text,
	View,
	Modal,
	Pressable,
	TouchableOpacity,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { fS } from "../core/fonts";
import { Icon } from "react-native-elements";

import {
	theme,
	shadow2,
	shadow,
	shadowFooterMenu,
	cardWidth,
	verticalBlankSpace,
} from "../core/theme";

import Button from "../Components/Button";
import Input from "../Components/Input";
import ErrorText from "../Components/ErrorText";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default EditableModal = ({
	setModalVisible,
	modalVisible,
	Heading,
	handleSubmit,
	children,
	error,
	onLoad,
	onCancel,
	buttonsArray,
	bref,
	onButtonPress,
}) => {
	const { t, i18n } = useTranslation();
	const [press, setPress] = useState(false);

	// useEffect(() => {
	// 	onLoad();
	// }, []);

	return (
		<View style={styles.root}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View style={styles.modalHead}>
							<Text style={styles.HeadText}>{t(Heading)}</Text>
							<Pressable
								onPressIn={() => {
									// console.log("Press");
									setPress(true);
								}}
								onPressOut={() => {
									onCancel();
									setPress(false);
								}}
								style={styles.cancelIcon}
							>
								<Icon
									name={press ? "close" : "cancel"}
									type={"material"}
									size={hp(4.5)}
									solid
									color={theme.colors.error}
								/>
							</Pressable>
						</View>
						{children}
						{error ? <ErrorText text={error} /> : null}
						<View style={styles.buttonArray}>
							{buttonsArray.map((b, index) => (
								<Button
									title={t(b.title)}
									solid={b.solid}
									containerStyle={{ marginBottom: hp(1), marginTop: hp(3) }}
									onPress={() => {
										// handleSubmit();
										onButtonPress({
											buttonTitle: b.title,
											buttonIndex: index,
										});
										// ref.current.stopLoading();
									}}
								/>
							))}
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.3)",
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 10,
		alignItems: "center",
		shadowColor: "#000",
		...cardWidth,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalHead: { position: "relative" },
	cancelIcon: {
		position: "absolute",
		right: 10,
	},
	HeadText: {
		fontSize: wp(5.5),
		fontFamily: fS().SemiBold,
		color: theme.colors.secondary,
		marginBottom: hp(2.5),
		marginTop: hp(1),
		paddingHorizontal: hp(2.5),
		...cardWidth,
	},
	buttonArray: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		...cardWidth,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
