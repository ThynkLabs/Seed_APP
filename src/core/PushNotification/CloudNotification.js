import { PushNotification } from "@aws-amplify/pushnotification";
import { PushNotificationIOS } from "@react-native-community/push-notification-ios";
import { storeToken, setNotif } from "../asyncStorage";
import { RegisterNotif } from "../../API/UserDB";
import { useDispatch } from "react-redux";

export const onNotification = () => {
  // const dispatch = useDispatch();

  PushNotification.onNotification((notification) => {
    // Note that the notification object structure is different from Android and IOS
    // console.log("in app notification", notification);
    setNotif(notification.data.title, notification.data.body);
    // dispatch({ type: "NOTIF_REFRESH" });
    // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/push-notification-ios#finish)
    // const data = JSON.parse(notification["pinpoint.jsonBody"]);
    // console.log("Parsed data", data);
    if (Platform.OS === "ios") {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  });
};
export const onNotificationEvent = () => {
  PushNotification.addEventListenerForAndroid((notification) => {
    // console.log("NOTIF:----> : ", notification);
  });
};
// export const onRegister = () => {
PushNotification.onRegister((token) => {
  // console.log("in app registration", token);
  // RegisterNotif(token)
  // 	.then(() => {
  // 		console.log("SENT");
  // 	})
  // 	.catch((err) => {
  // 		console.log("FAILED", err);
  // 	});
  storeToken(token)
    .then(() => {
      console.log("DONE");
    })
    .catch((error) => {
      console.log(error);
    });
});
// };
export const onNotificationOpened = () => {
  PushNotification.onNotificationOpened((notification) => {
    console.log("onNotificationOpened", notification);
    // // extract the data passed in the push notification
    // const data = JSON.parse(notification);
    // console.log("onNotificationOpened data", data);
  });
};
