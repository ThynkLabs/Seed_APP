// import { getUser, setName } from "../API/UserDB";

const initState = {
  loading: true,
  language: "",
  user: {},
  profilePhoto: "",
  loaderRandomNumber: 56834,
  username: "",
  notifCount: 0,
  mqttMessage: [],
  devices: [],
  schedules: [],
  stackScreen: "",
  loginRefresh: false,
  userRefresh: false,
  deviceRefresh: false,
  refreshDeviceSubscription: false,
  notifRefresh: false,
  networkAvailable: true,
  deviceModifyMode: "",
};

export const reducer = (state = initState, action) => {
  if (action.type === "SET_LANGUAGE") {
    return {
      ...state,
      language: action.payload,
    };
  }
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === "SET_USERNAME") {
    return {
      ...state,
      username: action.payload,
    };
  }
  if (action.type === "UPDATE_PROFILE_PHOTO") {
    return {
      ...state,
      profilePhoto: action.payload,
    };
  }

  if (action.type === "UPDATE_LOADER_RANDOM_NUMBER") {
    return {
      ...state,
      loaderRandomNumber: Math.random() * 100000,
    };
  }

  if (action.type === "SET_NOTIF_COUNT") {
    return {
      ...state,
      notifCount: action.payload,
    };
  }
  if (action.type === "SET_MQTT") {
    const find = state.mqttMessage.filter(
      (item) => item.deviceId === action.payload.deviceId
    );
    if (find.length == 0) {
      // console.log("Item does not exist in cart");
      let newArray = state.mqttMessage.slice();
      newArray.splice(action.payload.length, 0, action.payload);
      return {
        ...state,
        mqttMessage: newArray,
      };
    } else {
      // console.log("Item exist in cart");
      // if (action.payload.quantity === 0) {
      // 	return {
      // 		// returning a copy of orignal state
      // 		...state, //copying the original state
      // 		cart: state.cart.filter(
      // 			(item) => item.dishId !== action.payload.dishId
      // 		),
      // 	};
      // }
      const index = state.mqttMessage.findIndex(
        (el) => el.deviceId === action.payload.deviceId
      ); //finding index of the item
      // console.log("Index:", index);
      const newArray = [...state.mqttMessage]; //making a new array
      newArray[index].shadow = action.payload.shadow; //changing value in the new array
      return {
        ...state, //copying the orignal state
        mqttMessage: newArray, //reassingning todos to new array
      };
    }

    return {
      ...state,
      mqttMessage: action.payload,
    };
  }
  // if (action.type === "UPDATE_MQTT") {
  // 	//check if the

  // 	return {
  // 		...state,
  // 		mqttMessage: action.payload,
  // 	};
  // }
  if (action.type === "SET_DEVICES") {
    return {
      ...state,
      devices: action.payload,
    };
  }
  if (action.type === "SET_DEVICE_SCHEDULES") {
    return {
      ...state,
      schedules: action.payload.map((ci, i) => {
        return ci.schedules;
      }),
    };
  }
  if (action.type === "SET_SCHEDULES") {
    return {
      ...state,
      schedules: action.payload,
    };
  }
  if (action.type === "CHANGE_SCREEN") {
    return {
      ...state,
      stackScreen: action.payload,
    };
  }
  if (action.type === "LOGIN_REFRESH") {
    return {
      ...state,
      loginRefresh: !state.loginRefresh,
    };
  }
  if (action.type === "USER_REFRESH") {
    return {
      ...state,
      loginRefresh: !state.loginRefresh,
    };
  }
  if (action.type === "DEVICE_REFRESH") {
    return {
      ...state,
      deviceRefresh: !state.deviceRefresh,
    };
  }
  if (action.type === "DEVICE_REFRESH_SUBSCRIPTION") {
    return {
      ...state,
      refreshDeviceSubscription: !state.refreshDeviceSubscription,
    };
  }
  if (action.type === "NOTIF_REFRESH") {
    return {
      ...state,
      notifRefresh: !state.notifRefresh,
    };
  }
  if (action.type === "SET_NETWORK_CONNECTED") {
    return {
      ...state,
      networkAvailable: action.payload,
    };
  }
  if (action.type === "SET_DEVICE_MODIFY_MODE") {
    return {
      ...state,
      deviceModifyMode: action.payload,
    };
  }
  return state;
};
