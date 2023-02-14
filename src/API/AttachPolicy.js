import { attachPolicyURL } from "./url";

export default AttachPolicy = (id) => {
	return new Promise((resolve, reject) => {
		fetch(attachPolicyURL + "/api/attach-policy", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({ identityId: id }),
		})
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
