import { redirect } from "@sveltejs/kit";
import { gameManager } from "./games_manager";

export const load = ({cookies}) => {
    let id = cookies.get('userid', {path: '/'})
    if(!id) {
        id = crypto.randomUUID()
        cookies.set('userid', id, {path: '/'})
    }
    let username = cookies.get('username', {path: '/'})
    console.log("username", username)
    return {
        username: username,
        userid: id
    }
}

export const actions = {
    logout: async ({cookies, request}) => {
        cookies.delete("userid", {path: "/"})
        cookies.delete("username", {path: "/"})
    },
    login: async ({cookies, request}) => {
        //todo: get cookie from verification server 
        let data = await request.formData()
        console.log("data", data)
        if(data.get('username')) {
            cookies.set('username', data.get('username'), {path: '/'})
        }
    },
    createGame: async ({cookies, request}) => {
		console.log("GAME CREATED");
		const data = await request.formData(); 
        let id = crypto.randomUUID();
        //redirect to room page
        redirect(303, 'jasswithfriends/room/' + id);
	},
    destroyGame: async ({cookies, request}) => {
		const data = await request.formData();
        console.log("destroy game"); 
	},
    joinGame: async({cookies,request}) => {
        const data = await request.formData();
        const id = data.get("id");
        console.log("joining game", id);
        redirect(303, 'jasswithfriends/game/' + id);
    },
    startGame: async({cookies,request}) => {
        let data = await request.formData()
        console.log("start game", data)
        let id = data.get('gameid');
        redirect(303, '/jasswithfriends/game/' + id);
    },
    playCard: async({cookies, request}) => {

    },
    getState: async({cookies, request}) => {

    }

};	