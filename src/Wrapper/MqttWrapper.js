import { StyleSheet, Text, View, FlatList } from "react-native";
import { useEffect, useState, createContext, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { subscribe, publish } from "../core/mqtt/pubsub";

const MQTTContext = createContext();

const MQTTWrapper = ({ device, children }) => {
  const [Delta, setDelta] = useState({});
  const [reqTopic, setReqTopic] = useState("");
  const messageCb = () => {};
  useEffect(() => {
    const sub = subscribe(data.deviceId, {
      onMessage: (msg) => {
        // console.log(msg);
        if (msg.topic.includes("delta")) setDelta(msg);
        // if ( msg.topic.includes(req.topic)) set
      },
      onError: (msg) => {
        console.log(msg);
      },
    });
    // console.log(sub);
    return function cleanup() {
      // console.log("UNSUB Triggered");
      sub.unsubscribe();
    };
  }, []);

  // const getDeviceInfo = (deviceId)=>{
  // 	setReqTopic(`${deviceId}/shadow/get/accepted`)
  // 	publish("get", deviceId);
  // }

  return <MQTTContext.Provider delta={Delta}>{children}</MQTTContext.Provider>;
};
