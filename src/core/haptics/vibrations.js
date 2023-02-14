import React from "react";
import {
	Button,
	Platform,
	Text,
	Vibration,
	View,
	SafeAreaView,
	StyleSheet,
} from "react-native";
const ONE_SECOND_IN_MS = 50;

const PATTERN = [1 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS];

export const basicPattern = () => {
	Vibration.vibrate(PATTERN);
};
