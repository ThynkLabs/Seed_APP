import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import { deviceReducer } from "./device/reducer";
import { schedulesReducer } from "./schedules/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	device: deviceReducer,
	schedule: schedulesReducer,
	general: reducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
