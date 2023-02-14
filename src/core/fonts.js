import { useContext, createContext } from "react";
const AppContext = createContext();
import AppLoading from "expo-app-loading";
import {
	useFonts,
	Mukta_200ExtraLight,
	Mukta_300Light,
	Mukta_400Regular,
	Mukta_500Medium,
	Mukta_600SemiBold,
	Mukta_700Bold,
	Mukta_800ExtraBold,
} from "@expo-google-fonts/mukta";
import {
	Exo2_200ExtraLight,
	Exo2_300Light,
	Exo2_400Regular,
	Exo2_500Medium,
	Exo2_600SemiBold,
	Exo2_700Bold,
	Exo2_800ExtraBold,
} from "@expo-google-fonts/exo-2";

export let fontLan = "en";
export const setFontLan = (s) => {
	fontLan = s;
};

export const fS = () => {
	return fontLan === "en" ? fonts.english : fonts.devangiri;
};
export const fonts = {
	devangiri: {
		ExtraLight: "Mukta_200ExtraLight",
		Light: "Mukta_300Light",
		Regular: "Mukta_400Regular",
		Medium: "Mukta_500Medium",
		SemiBold: "Mukta_600SemiBold",
		Bold: "Mukta_700Bold",
		ExtraBold: "Mukta_800ExtraBold",
	},
	english: {
		ExtraLight: "Exo2_200ExtraLight",
		Light: "Exo2_300Light",
		Regular: "Exo2_400Regular",
		Medium: "Exo2_500Medium",
		SemiBold: "Exo2_600SemiBold",
		Bold: "Exo2_700Bold",
		ExtraBold: "Exo2_800ExtraBold",
	},
};

export default FontProvider = ({ children }) => {
	let [fontsLoaded] = useFonts({
		Mukta_200ExtraLight,
		Mukta_300Light,
		Mukta_400Regular,
		Mukta_500Medium,
		Mukta_600SemiBold,
		Mukta_700Bold,
		Mukta_800ExtraBold,
		Exo2_200ExtraLight,
		Exo2_300Light,
		Exo2_400Regular,
		Exo2_500Medium,
		Exo2_600SemiBold,
		Exo2_700Bold,
		Exo2_800ExtraBold,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return children;
	}
};
