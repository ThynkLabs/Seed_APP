import Tts from "react-native-tts";

const tts_language_type_converter = (language) => {
	return language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-GB";
};

export const setTTSLanguage = (lang) => {
	Tts.setDefaultLanguage(tts_language_type_converter("en"));
};

export const speak = (text) => {
	Tts.speak(text, {
		androidParams: {
			KEY_PARAM_PAN: -1,
			KEY_PARAM_VOLUME: 1,
			KEY_PARAM_STREAM: "STREAM_MUSIC",
		},
	});
};
