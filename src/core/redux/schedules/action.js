import { getSchedulesbyUser } from "../../../API/UserDB";

export const GET_SCHEDULES_REQUEST = "GET_SCHEDULES_REQUEST";
export const GET_SCHEDULES_SUCCESS = "GET_SCHEDULES_SUCCESS";
export const GET_SCHEDULES_FAILURE = "GET_SCHEDULES_FAILURE";

export const getSchedulesRequest = () => {
	return {
		type: GET_SCHEDULES_REQUEST,
	};
};
export const getSchedulesSuccess = (schedules) => {
	return {
		type: GET_SCHEDULES_SUCCESS,
		payload: schedules,
	};
};
export const getSchedulesFailure = (error) => {
	return {
		type: GET_SCHEDULES_FAILURE,
		payload: error,
	};
};

export const getSchedules = () => {
	return function (dispatch) {
		dispatch(getSchedulesRequest());
		getSchedulesbyUser()
			.then((schedules) => {
				// const schedules = devices.map(({ schedules }) => schedules);
				dispatch(getSchedulesSuccess(schedules));
			})
			.catch((error) => {
				dispatch(getSchedulesFailure(error));
			});
	};
};
