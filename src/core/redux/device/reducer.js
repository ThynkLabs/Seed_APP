import {
	GET_DEVICES_REQUEST,
	GET_DEVICES_SUCCESS,
	GET_DEVICES_FAILURE,
	SET_NEW_MESSAGE,
} from "./action";

import {
	getParamtetersInitial,
	getParamtetersOnMessage,
} from "../../mqtt/pubsub";

const initialState = {
	loading: false,
	devices: [],
	messages: [],
	error: "",
};

export const deviceReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DEVICES_REQUEST:
			return {
				...state,
				loading: true,
			};

		case GET_DEVICES_SUCCESS:
			return {
				...state,
				loading: false,
				devices: action.payload.devices,
				messages: action.payload.messages,
				error: "",
			};

		case GET_DEVICES_FAILURE:
			return {
				...state,
				loading: false,
				devices: [],
				messages: [],
				error: action.payload,
			};
		case SET_NEW_MESSAGE:
			return {
				...state,
				messages: action.payload,
			};
		default:
			return state;
	}
};
