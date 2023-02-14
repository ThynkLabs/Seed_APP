import { shadowURL } from "./url";

export const GetShadow = (id) => {
	return new Promise((resolve, reject) => {
		fetch(shadowURL + "/api/shadow/" + id)
			.then((response) => response.json())
			.then((d) => {
				console.log(d);
				resolve(d);
			})
			.catch((e) => {
				console.error(e);
				reject(e);
			});
	});
};

export const GetAllDeviceShadow = (deviceIds) => {
	return new Promise((resolve, reject) => {
		fetch(
			shadowURL + "/api/devices/shadow?devices=" + JSON.stringify(deviceIds)
		)
			.then((response) => response.json())
			.then((d) => {
				console.log(d);
				resolve(d);
			})
			.catch((e) => {
				console.error(e);
				reject(e);
			});
	});
};
