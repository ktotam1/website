
export const actions = {
	//TODO: text it to me on telegram idk
	submit: async ({cookies, request}) => {
		const data = await request.formData(); 
		console.log("new message:", data.get('name'), data.get('email'), data.get('subject'), data.get('msg'));
	}
};	