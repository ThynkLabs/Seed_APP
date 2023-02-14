import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDateLocaleLanguage } from "../core/multilingual/datelocale";
import { useDispatch } from "react-redux";
import store from "./redux/store";

/* --------------------------------------FCM TOKEN------------------------------------------ */
export const storeToken = async (value) => {
  try {
    await AsyncStorage.setItem("RegisterToken", value);
  } catch (e) {
    // saving error
    console.log("ASYNC E", e);
  }
};

export const getToken = async (value) => {
  try {
    const t = await AsyncStorage.getItem("RegisterToken", value);
    return t;
  } catch (e) {
    // saving error
    console.log("ASYNC E", e);
  }
};
/* -------------XX-----------------------FCM TOKEN------------------XX--------------------- */

/* --------------------------------------USER NAME------------------------------------------ */

export const storeName = async (value) => {
  try {
    await AsyncStorage.setItem("Username", value);
  } catch (e) {
    // saving error
    console.log("ASYNC E", e);
  }
};

export const getName = async (value) => {
  try {
    const t = await AsyncStorage.getItem("Username", value);
    return t;
  } catch (e) {
    // saving error
    console.log("ASYNC E", e);
  }
};

/* -----------------XX------------------USER NAME--------------------XX------------------- */

export const setNotif = async (head, body) => {
  // const dispatch = store.dispatch();
  try {
    const exists = await AsyncStorage.getItem("Notifs");
    // const exists = Notifs.length > 0?Notifs:null
    if (exists === null) {
      const notif = [{ head: head, body: body, date: new Date() }];
      const sn = JSON.stringify(notif);
      await AsyncStorage.setItem("Notifs", sn);
    } else if (exists) {
      const pn = JSON.parse(exists);
      if (pn.length >= 20) {
        pn.pop();
      }
      pn.splice(0, 0, { head: head, body: body, date: new Date() });
      await AsyncStorage.setItem("Notifs", JSON.stringify(pn));
    }
    const newItems = await AsyncStorage.getItem("Notifs");

    store.dispatch({
      type: "SET_NOTIF_COUNT",
      payload: JSON.parse(newItems).length,
    });
    return newItems;
  } catch (e) {
    // saving error
    console.log("ASYNC E", e);
  }
};
export const getNotifs = async () => {
  try {
    const t = await AsyncStorage.getItem("Notifs");
    return t;
  } catch (e) {
    // saving error
    console.log("ASYNC E", e);
  }
};
export const clearNotifs = async () => {
  try {
    const t = await AsyncStorage.removeItem("Notifs");
    store.dispatch({
      type: "SET_NOTIF_COUNT",
      payload: 0,
    });
    return t;
  } catch (e) {
    // saving error
    console.log("ASYNC E", e);
  }
};

export const SetHindi = async () => {
  try {
    await AsyncStorage.setItem("language", "hi");
    return true;
  } catch (error) {
    // Error saving data
    return false;
  }
};
export const SetEnglish = async () => {
  try {
    await AsyncStorage.setItem("language", "en");
    return true;
  } catch (error) {
    // Error saving data
    return false;
  }
};
export const SetMarathi = async () => {
  try {
    await AsyncStorage.setItem("language", "mr");
    return true;
  } catch (error) {
    // Error saving data
    return false;
  }
};
export const GetLanguage = async () => {
  try {
    const value = await AsyncStorage.getItem("language");
    if (value === null) {
      // We have data!!
      return null;
    }
    return value;
  } catch (error) {
    // Error retrieving data
    return null;
  }
};
export const SetLanguage = async (va) => {
  try {
    await AsyncStorage.setItem("language", va);
    // setTTSLanguage(va);
    setDateLocaleLanguage(va);
    return true;
  } catch (error) {
    // Error saving data
    return false;
  }
};
