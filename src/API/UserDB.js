import { dbURL } from "./url";
import { Auth } from "@aws-amplify/auth";
// import { getToken } from "../core/asyncStorage";
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

export const getUser = () => {
  return new Promise((resolve, reject) => {
    currentUser().then((user) => {
      // resolve({
      // 	__v: 0,
      // 	_id: "62018c9b05a193480ca483ee",
      // 	identityId: "ap-south-1:f1d70fa8-1c06-40a5-bf42-860187bf250b",
      // 	name: "Darshan",
      // 	notifTokenId: [],
      // 	phone: "+918788286875",
      // 	userId: "cfe87342-3adf-4d1a-89db-1ddc8c4f2d1f",
      // });
      fetch(dbURL + "/db/user/" + user.sub)
        .then((response) => response.json())
        .then((d) => {
          // console.log("US:", d);
          resolve(d[0]);
        })
        .catch((e) => {
          reject(e);
        });
    });
  });
};

export const setName = (Uname) => {
  return new Promise((resolve, reject) => {
    currentUser().then((user) => {
      fetch(dbURL + "/db/user/" + user.sub, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(Uname),
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
  });
};
export const setProfilePhoto = (pf) => {
  return new Promise((resolve, reject) => {
    currentUser().then((user) => {
      fetch(dbURL + "/db/user/" + user.sub, {
        method: "PATCH",
        headers: {
          // "content-type": "multipart/form-data",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profilePhoto: pf }),
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
  });
};

export const setLanguageDB = (Uname) => {
  return new Promise((resolve, reject) => {
    currentUser().then((user) => {
      fetch(dbURL + "/db/user/" + user.sub, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(Uname),
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
  });
};

export const setLoginDB = (type, userId, token, name) => {
  return new Promise((resolve, reject) => {
    currentUser().then((user) => {
      // console.log("LI/LO USR:", type === "login" ? userId : user.sub);
      const usr = type === "login" ? userId : user.sub;

      fetch(dbURL + "/db/user/device/" + usr, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
          type === "login"
            ? JSON.stringify({
                setParam: "deviceTokenId",
                deviceTokenId: token,
                name: name,
              })
            : JSON.stringify({
                setParam: "both",
                deviceTokenId: token,
                loggedIn: false,
                name: name,
              }),
      })
        .then((response) => response.json())
        .then((d) => {
          // console.log(d);
          // console.log("LI/LO RES", d);
          resolve(d);
        })
        .catch((e) => {
          // console.error("LI/LO ERR", e);
          reject(e);
        });
    });
  });
};

export const setidentityId = (id) => {
  return new Promise((resolve, reject) => {
    currentUser().then((user) => {
      fetch(dbURL + "/db/user/" + user.sub, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ identityId: id }),
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
  });
};

export const RegisterNotif = (id) => {
  return new Promise((resolve, reject) => {
    currentUser().then((user) => {
      fetch(dbURL + "/db/user/" + user.sub, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ notifTokenId: id }),
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
  });
};

export const getDevicesbyUser = () => {
  return new Promise((resolve, reject) => {
    currentUser().then((user) => {
      fetch(dbURL + "/db/devices/user/" + user.sub)
        .then((response) => response.json())
        .then((d) => {
          resolve(d);
        })
        .catch((e) => {
          reject(e);
        });
    });
  });
};

export const checkDeviceExistance = (deviceId) => {
  return new Promise((resolve, reject) => {
    currentUser().then((user) => {
      fetch(dbURL + "/db/device/availability/" + deviceId)
        .then((response) => response.json())
        .then((d) => {
          resolve({ error: false, ...d });
        })
        .catch((e) => {
          // console.error(e);
          reject(e);
          resolve({ error: true });
        });
    });
  });
};

export const RegisterDevice = (deviceId, deviceName) => {
  return new Promise((resolve, reject) => {
    currentUser().then((user) => {
      fetch(dbURL + "/db/device/register/" + deviceId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ userId: user.sub, deviceName: deviceName }),
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
  });
};

export const unregisterDevice = (deviceId) => {
  return new Promise((resolve, reject) => {
    fetch(dbURL + "/db/device/unregister/" + deviceId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
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
export const changeDeviceName = (deviceId, deviceName) => {
  return new Promise((resolve, reject) => {
    fetch(dbURL + "/db/device/name/" + deviceId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ deviceName: deviceName }),
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

export const getSchedulesbyUser = () => {
  return new Promise((resolve, reject) => {
    currentUser().then((user) => {
      fetch(dbURL + "/db/schedules/user/" + user.sub)
        .then((response) => response.json())
        .then((d) => {
          resolve(d);
        })
        .catch((e) => {
          console.error(e);
          reject(e);
        });
    });
  });
};
