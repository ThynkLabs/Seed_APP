import { FileUploadMicroservice } from "./url";
import { Auth } from "@aws-amplify/auth";
import Amplify from "@aws-amplify/core";
import axios from "axios";

export const UpdateImage = (formData) => {
  const func = new Promise((resolve, reject) => {
    Auth.currentSession().then((session) => {
      // const config = {
      // 	headers: {
      // 		"content-type": "multipart/form-data",
      // 		Authorization: session.idToken.jwtToken,
      // 	},
      // };
      // console.log(session.accessToken.payload.username);
      var requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: session.idToken.jwtToken,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      fetch(
        FileUploadMicroservice +
          "/upload-delete" +
          `?imgName=${session.accessToken.payload.username}`,
        requestOptions
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
  });
  return func;
};

// export const UpdateImage = (formData) => {
// 	const func = new Promise((resolve, reject) => {
// 		Auth.currentSession().then((session) => {
// 			const config = {
// 				headers: {
// 					"content-type": "multipart/form-data",
// 					Authorization: session.idToken.jwtToken,
// 				},
// 			};
// 			axios
// 				.post(
// 					//'http://localhost:4000' +
// 					FileUploadMicroservice +
// 						"/upload-delete" +
// 						`?imgName=${session.accessToken.payload.username}`,
// 					formData,
// 					config
// 				)
// 				.then((d) => {
// 					// console.log(d);
// 					resolve(d);
// 				})
// 				.catch((e) => {
// 					// console.error(e);
// 					reject(e);
// 				});
// 		});
// 	});
// 	return func;
// };
