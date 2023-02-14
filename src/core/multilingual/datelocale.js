// import { en, mr, hi } from "date-fns/locale";
// import { GetLanguage } from "../asyncStorage";
import moment from "moment";
import "moment/locale/hi";
import "moment/locale/mr";

// export default dateLocale = async () => {
// 	try {
// 		const language = await GetLanguage();
// 		return language == "hi" ? hi : language === "mr" ? mr : en;
// 	} catch (e) {
// 		return en;
// 	}
// };

export const setDateLocaleLanguage = (lang) => {
	moment.locale(lang);
};
