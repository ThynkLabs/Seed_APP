import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import hi from "./hi.json";
import mr from "./mr.json";
import { GetLanguage } from "../asyncStorage";

// GetLanguage().then((lan) => {
i18n.use(initReactI18next).init({
	compatibilityJSON: "v3",
	lng: "en",
	fallbackLng: "en",
	resources: {
		en: en,
		hi: hi,
		mr: mr,
	},
	interpolation: {
		escapeValue: false, // react already safes from xss
	},
});
// });
export default i18n;
