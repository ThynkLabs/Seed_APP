import { subscribe } from "./pubsub";

export const shadowSubscribe = (device_ids, dispatch) => {
	return subscribeAllDevices(device_ids, {
		onMessage: (msg) => {
			console.log(msg);
			// if (msg.topic.includes(device_ids) && msg.topic.includes("delta")) {
			// 	setDeltaMessage(msg.message.state.p);
			// }
			// if (
			// 	msg.topic.includes(device_ids) &&
			// 	msg.topic.includes("update/documents")
			// ) {
			// 	console.log(msg.message.current.metadata.reported.p.timestamp);
			// 	console.log(msg.message.current.metadata.reported.f.timestamp);
			// 	const metap = msg.message.current.metadata.reported.p.timestamp;
			// 	const metaf = msg.message.current.metadata.reported.f.timestamp;
			// 	setUpdated(
			// 		metap >= metaf
			// 			? moment(metap * 1000).toNow()
			// 			: moment(metaf * 1000).toNow()
			// 	);
			// 	// console.log("PREV: ", msg.message.current.state.desired.p);
			// 	// console.log("CURR: ", msg.message.previous.state.desired.p);
			// 	setDeltaMessage(msg.message.current.state.desired);
			// 	setPhase(msg.message.current.state.desired.f);
			// }
		},
		onError: (msg) => {
			console.log(msg);
		},
	});
};

export const shadowUnsubscribe = () => {
	shadowSubscribe.unsubscribe();
};
