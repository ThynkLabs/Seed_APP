import {
	GET_SCHEDULES_REQUEST,
	GET_SCHEDULES_SUCCESS,
	GET_SCHEDULES_FAILURE,
} from "./action";

const initialState = {
	loading: false,
	schedules: [],
	error: "",
};

export const schedulesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_SCHEDULES_REQUEST:
			return {
				...state,
				loading: true,
			};

		case GET_SCHEDULES_SUCCESS:
			return {
				...state,
				loading: false,
				schedules: action.payload,
				error: "",
			};

		case GET_SCHEDULES_FAILURE:
			return {
				...state,
				loading: false,
				schedules: [],
				error: action.payload,
			};
		default:
			return state;
	}
};
