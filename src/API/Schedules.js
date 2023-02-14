import { dbURL } from "./url";
import { Auth } from "@aws-amplify/auth";
import { getToken } from "../core/asyncStorage";
const currentUser = async () => {
  try {
    let user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    // console.log(attributes);
    return attributes;
  } catch (e) {
    return e;
  }
};

export const GetSchedules = async (deviceId) => {
  return new Promise((resolve, reject) => {
    fetch(dbURL + "/db/schedule/" + deviceId)
      .then((response) => response.json())
      .then((d) => {
        // console.log("US:", d);
        resolve(d);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const NewSchedule = async (deviceId, obj) => {
  return new Promise((resolve, reject) => {
    fetch(dbURL + "/db/schedule/" + deviceId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((d) => {
        // console.log(d);
        resolve(d);
      })
      .catch((e) => {
        // console.error(e);
        reject(e);
      });
  });
};

export const DeleteSchedule = async (scheduleId, deviceId) => {
  return new Promise((resolve, reject) => {
    fetch(
      dbURL +
        "/db/schedule/delete?scheduleId=" +
        scheduleId +
        "&deviceId=" +
        deviceId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
      .then((response) => response.json())
      .then((d) => {
        // console.log(d);
        resolve(d);
      })
      .catch((e) => {
        // console.error(e);
        reject(e);
      });
  });
};
