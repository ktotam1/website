import { env } from "$env/dynamic/private";
import { fail } from "@sveltejs/kit";
const BOT_KEY = env.BOT_KEY;
const CHAT_ID = env.CHAT_ID;
const telegramUrl = "https://api.telegram.org/bot" + BOT_KEY;

export const actions = {
	//TODO: text it to me on telegram idk
	submit: async ({cookies, request}) => {
		const data = await request.formData(); 
		let requirements = ["name", "email", "subject", "msg"]
		for(let requirement of requirements){
			if(!data.has(requirement) || data.get(requirement).length == 0){
				return fail(400, {bad: true})
			}
		}
		try {
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
			console.log("new message:", data.get('name'), data.get('email'), data.get('subject'), data.get('msg'));
			if(res.status != 200) return fail(500, {error: true})
		} catch (e) {
			console.error(e)
			return fail(500, {error: true})
		}
		
		return {success: true}
	}
};	