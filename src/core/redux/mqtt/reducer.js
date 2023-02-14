import { NEW_MQTT_MESSAGE } from "./action";

const initialState = {
	messages: [],
};

export const mqttReducer = (state = initialState, action) => {
	switch (action.type) {
		case NEW_MQTT_MESSAGE:
			return {
				...state,
				messages: action.payload,
			};
		default:
			return state;
	}
};
