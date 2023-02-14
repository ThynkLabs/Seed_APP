import { PubSub } from "@aws-amplify/pubsub";

import moment from "moment";
const prema = (deviceId) => {
  return `$aws/things/${deviceId}/shadow/`;
};

export const subscribe = (deviceId, cb) => {
  const sPrema = prema(deviceId);
  const GetAccepted = sPrema + "get/accepted";
  const GetRejected = sPrema + "get/rejected";
  const UpdateDelta = sPrema + "update/documents";
  const UpdateRejected = sPrema + "update/rejected";
  const UpdateAccepted = sPrema + "update/accepted";

  return PubSub.subscribe([
    GetAccepted,
    GetRejected,
    UpdateDelta,
    UpdateRejected,
    UpdateAccepted,
  ]).subscribe({
    next: (data) => {
      // console.log(data);
      const topic = data.value[Object.getOwnPropertySymbols(data.value)[0]]; // Read about symbols https://www.keitlhcirkel.co.uk/metaprogramming-in-es6-symbols/
      cb.onMessage({
        topic: topic,
        deviceId: deviceId,
        message: data.value,
      });
    },
    error: (error) => {
      cb.onError(null, error);
    },
    complete: () => {
      console.log("Done");
    },
  });
};

export const subscribeAllDevices = (deviceIds, cb) => {
  let deviceTopics = [];
  const arrayOfDeviceTopics = deviceIds.forEach((id, index) => {
    const sPrema = prema(id);
    const GetAccepted = sPrema + "get/accepted";
    const GetRejected = sPrema + "get/rejected";
    const UpdateDelta = sPrema + "update/documents";
    const UpdateRejected = sPrema + "update/rejected";
    const UpdateAccepted = sPrema + "update/accepted";
    deviceTopics.push(GetAccepted);
    deviceTopics.push(GetRejected);
    deviceTopics.push(UpdateDelta);
    deviceTopics.push(UpdateRejected);
    deviceTopics.push(UpdateAccepted);
  });
  // return deviceTopics;
  return PubSub.subscribe(deviceTopics).subscribe({
    next: (data) => {
      const topic = data.value[Object.getOwnPropertySymbols(data.value)[0]]; // Read about symbols https://www.keitlhcirkel.co.uk/metaprogramming-in-es6-symbols/
      // console.log("TOPIC :", topic);
      // check if the received topic contains a id from device ids array

      // if contains then return the device id
      const scDid = deviceIds.map((deviceId, i) => {
        return topic.contains(deviceId) ? deviceId : NULL;
      });

      cb.onMessage({
        topic: topic,
        deviceId: scDid[0],
        message: data.value,
      });
    },
    error: (error) => {
      cb.onError(null, error);
    },
    complete: () => {
      console.log("Done");
    },
  });
};

export const publish = async (topicSuffix, deviceId, msg) => {
  const sPrema = prema(deviceId);
  PubSub.publish(sPrema + topicSuffix, msg);
};

export const getParamtetersInitial = (shadowDoc) => {
  const metap = shadowDoc.metadata.reported.p.timestamp;
  const metaf = shadowDoc.metadata.reported.f.timestamp;
  const metas = shadowDoc.metadata.reported.s.timestamp;
  const maxDate = Math.max(metap, metaf, metas);
  const updatedAt = moment(new Date(maxDate * 1000)).fromNow();
  // const updatedAt =
  //   metap.timestamp > metaf.timestamp
  //     ? moment(new Date(metap.timestamp * 1000)).fromNow()
  //     : moment(new Date(metaf.timestamp * 1000)).fromNow();
  const deltaMessage = shadowDoc.state.desired;
  const phaseString = shadowDoc.state.desired.f;
  const pumpState = shadowDoc.state.desired.p;
  const deviceState = shadowDoc.state.desired.s;
  const phaseInt = phaseString
    .toString()
    .split("")
    .map((iNum) => parseInt(iNum, 10));
  return {
    updatedAt: updatedAt,
    f_s: phaseString,
    f_i: phaseInt,
    s: deviceState,
    p: pumpState,
    delta: deltaMessage,
  };
};

export const getParamtetersOnMessage = (shadowDoc) => {
  const metap = shadowDoc.message.current.metadata.reported.p.timestamp;
  const metaf = shadowDoc.message.current.metadata.reported.f.timestamp;
  const metas = shadowDoc.message.current.metadata.reported.s.timestamp;
  const maxDate = Math.max(metap, metaf, metas);
  const updatedAt = moment(new Date(maxDate * 1000)).fromNow();
  // const updatedAt =
  //   metap >= metaf
  //     ? moment(metap * 1000).toNow()
  //     : moment(metaf * 1000).toNow();
  const deltaMessage = shadowDoc.message.current.state.desired;
  const phaseString = shadowDoc.message.current.state.desired.f;
  const pumpState = shadowDoc.message.current.state.desired.p;
  const deviceState = shadowDoc.message.current.state.desired.s;
  const phaseInt = phaseString
    .toString()
    .split("")
    .map((iNum) => parseInt(iNum, 10));

  return {
    updatedAt: updatedAt,
    f_s: phaseString,
    f_i: phaseInt,
    s: deviceState,
    p: pumpState,
    delta: deltaMessage,
  };
  // console.log("PREV: ", msg.message.current.state.desired.p);
  // console.log("CURR: ", msg.message.previous.state.desired.p);
  // setDeltaMessage(msg.);
  // setPhase(msg.);
};
