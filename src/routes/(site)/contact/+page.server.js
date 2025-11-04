
export const actions = {
	// @ts-ignore
	submit: async ({cookies, request}) => {
		console.log("submit");
		const data = await request.formData(); 
		console.log(data.get('name'), data.get('email'), data.get('subject'), data.get('msg'));
	}
};	