import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";
import App from "./App";
// import Amplify, { Auth } from "aws-amplify";
import { Auth } from "@aws-amplify/auth";
import Amplify from "@aws-amplify/core";
import { AWSIoTProvider } from "@aws-amplify/pubsub";
import { PushNotification } from "@aws-amplify/pushnotification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import {
  onNotification,
  onNotificationOpened,
} from "./src/core/PushNotification/CloudNotification";
// import awsconfig from "./aws-exports";
Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    identityPoolId: "ap-south-1:8921cea3-93a6-4007-984b-477153a8471c",
    region: "ap-south-1",
    authenticationFlowType: "CUSTOM_AUTH",
    userPoolId: "ap-south-1_erdVpFTVT",
    userPoolWebClientId: "44gb2te0v145hf5vjrrdjnem8n",
    PushNotification: {
      appId: "1:478239037100:android:68505a7ebdf7141ff97109",
      requestIOSPermissions: false,
    },
  },
});

//ap-south-1:d65ce2ba-cedc-4856-bf89-29d0f2b3d28f - 7744054735
//ap-south-1:11262a24-6bd1-4542-b943-02ba32063545 -8788286875

const currentConfig = Auth.configure();

onNotification();
onNotificationOpened();
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

// AppRegistry.registerComponent("seed", () => App);
