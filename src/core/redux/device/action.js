import {
  getUser,
  getDevicesbyUser,
  unregisterDevice,
  changeDeviceName,
} from "../../../API/UserDB";
import {
  shadowSubscribe,
  shadowUnsubscribe,
} from "../../mqtt/subscribe_shadow";
import { GetAllDeviceShadow } from "../../../API/PubSub";
import {
  getParamtetersInitial,
  getParamtetersOnMessage,
} from "../../mqtt/pubsub";

export const GET_DEVICES_REQUEST = "GET_DEVICES_REQUEST";
export const GET_DEVICES_SUCCESS = "GET_DEVICES_SUCCESS";
export const GET_DEVICES_FAILURE = "GET_DEVICES_FAILURE";
export const SET_NEW_MESSAGE = "SET_NEW_MESSAGE";

export const getDevicesRequest = () => {
  return {
    type: GET_DEVICES_REQUEST,
  };
};
export const getDevicesSuccess = (devices, messages) => {
  return {
    type: GET_DEVICES_SUCCESS,
    payload: { devices: devices, messages: messages },
  };
};
export const getDevicesFailure = (error) => {
  return {
    type: GET_DEVICES_FAILURE,
    payload: error,
  };
};

export const setNewMessage = (newMessage) => {
  return { type: SET_NEW_MESSAGE, payload: newMessage };
};

export const getDevices = () => {
  return async function (dispatch) {
    dispatch(getDevicesRequest());
    try {
      const devices = await getDevicesbyUser();
      const dev = devices.map(({ schedules, ...rest }) => rest);
      const deviceIds = devices.map((device) => device.deviceId);
      const deviceShadows = await GetAllDeviceShadow(deviceIds);
      const manipulatedShadows = deviceShadows.map((deviceShadow) => {
        const initShadowParams = getParamtetersInitial(deviceShadow.shadow);
        return { deviceId: deviceShadow.deviceId, shadow: initShadowParams };
      });
      dispatch(getDevicesSuccess(dev, manipulatedShadows));
    } catch (e) {
      dispatch(getDevicesFailure(e));
    }
  };
};

export const setDeviceName = (deviceId, deviceName) => {
  return async function (dispatch) {
    try {
      const res = await changeDeviceName(deviceId, deviceName);
      dispatch(getDevices());
    } catch (e) {
      console.log(e);
      dispatch(getDevicesFailure(e));
    }
  };
};

export const deleteDevice = (deviceId) => {
  return async function (dispatch) {
    try {
      const res = await unregisterDevice(deviceId);
      dispatch(getDevices());
    } catch (e) {
      console.log(e);
      dispatch(getDevicesFailure(e));
    }
  };
};

export const newMessage = (messageObject, deviceId) => {
  return async function (dispatch, getState) {
    // New Message received
    //extract the parameters
    const messages_state = getState().device.messages;
    const device_state = getState().device.devices;
    const index = messages_state.findIndex((el) => el.deviceId === deviceId); //finding index of the item
    // console.log("Index:", index);
    const manipulatedShadows = getParamtetersOnMessage(messageObject);
    // const manipulatedShadows = deviceShadows.map((deviceShadow) => {
    // 	const initShadowParams = getParamtetersInitial(deviceShadow.shadow);
    // 	return { deviceId: deviceShadow.deviceId, shadow: initShadowParams };
    // });
    const newArray = [...messages_state]; //making a new array
    newArray[index].shadow = manipulatedShadows; //changing value in the new array
    // return {
    // 	...state, //copying the orignal state
    // 	mqttMessage: newArray, //reassingning todos to new array
    // };

    dispatch(setNewMessage(newArray));
  };
};

// try {
// 	const devices = await getDevicesbyUser();
// 	const dev = devices.map(({ schedules, ...rest }) => rest);
// 	const deviceIds = devices.map((device) => device.deviceId);
// 	const deviceShadows = await GetAllDeviceShadow(deviceIds);
// 	const devWithShadow = dev.map((device) => {
// 		const shadowObj = deviceShadows.find(
// 			(shadow) => shadow.deviceId === device.deviceId
// 		);
// 		const initShadowParams = getParamtetersInitial(shadowObj.shadow);
// 		return { ...device, ...initShadowParams };
// 	});
// 	console.log("INIT SHADOW PARAMS:", devWithShadow);
// 	dispatch(getDevicesSuccess(devWithShadow));
// } catch (e) {
// 	console.log(e);
// 	dispatch(getDevicesFailure(e));
// }
