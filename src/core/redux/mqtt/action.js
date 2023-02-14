import { GetAllDeviceShadow } from "../../../API/PubSub";
import {
	getParamtetersInitial,
	getParamtetersOnMessage,
} from "../../mqtt/pubsub";

export const NEW_MQTT_MESSAGE = "NEW_MQTT_MESSAGE";

export const setMqttMessage = (message) => {
	return {
		type: NEW_MQTT_MESSAGE,
		message: message,
	};
};

// export const getMessage = (message) => {
// 	return function (dispatch) {
// 		try {
// 			const deviceShadows = await GetAllDeviceShadow(deviceIds);
// 			console.log("INIT SHADOW PARAMS:", deviceShadows);
// 			dispatch(setMqttMessage(deviceShadows));
// 		} catch (e) {
// 			console.log(e);
// 		}

// 	}
// }

// export const newMessage = (messageObject) => {
// 	return function (dispatch) {
// 		//extract the parameters
// 		const { updatedAt, f_s, f_i, p, delta } =
// 			getParamtetersOnMessage(messageObject);
// 		// dispatch it with current device data
// 		const newMessageObject = { ...deviceObject, updatedAt, f_s, f_i, p, delta };
// 		console.log("D OBJECT NEW: ", newMessageObject);
// 		dispatch(setMqttMessage(newMessageObject));
// 	};
// };
