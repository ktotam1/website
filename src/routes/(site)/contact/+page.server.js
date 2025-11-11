import { env } from "$env/dynamic/private";
const BOT_KEY = env.BOT_KEY;
const CHAT_ID = env.CHAT_ID;
const telegramUrl = "https://api.telegram.org/bot" + BOT_KEY;

export const actions = {
	//TODO: text it to me on telegram idk
	submit: async ({cookies, request}) => {
		const data = await request.formData(); 
		let res = await fetch(telegramUrl + "/sendMessage", {
			method: "POST",
			headers: {
    			"Content-Type": "application/json",
  			},
			body: JSON.stringify({
				'chat_id': CHAT_ID,
				'text': `from: ${data.get('name')}\nemail: ${data.get('email')}\nsubject: ${data.get('subject')}\nmessage: ${data.get('msg')}`
			})
		})
		console.log(res)
		console.log("new message:", data.get('name'), data.get('email'), data.get('subject'), data.get('msg'));
	}
};	