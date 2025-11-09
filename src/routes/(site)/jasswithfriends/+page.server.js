import { redirect } from "@sveltejs/kit";
import {Player, gameManager } from "./games_manager";

export const load = ({cookies}) => {
    let id = cookies.get('userid', {path: '/'})
    if(!id) {
        id = crypto.randomUUID()
        cookies.set('userid', id, {path: '/'})
    }
    let username = cookies.get('username', {path: '/'})
    return {
        username: username,
        userid: id
    }
}

//todo: check if all values exist and return error messages 
export const actions = {
    logout: async ({cookies, request}) => {
        cookies.delete("userid", {path: "/"})
        cookies.delete("username", {path: "/"})
    },
    login: async ({cookies, request}) => {
        //todo: get cookie from verification server 
        //make ID different from cookie ?!
        let data = await request.formData()
        if(data.get('username')) {
            cookies.set('username', data.get('username'), {path: '/'})
        }
    },
    createGame: async ({cookies, request}) => {
        //todo: check that this user doesnt already have a game 
		console.log("GAME CREATED");
		const data = await request.formData(); 
        let gameid = crypto.randomUUID();
        //redirect to room page
        // console.log(data)
        gameManager.createGame(new Player(data.get('gameOwner'), data.get("username")), gameid);
        redirect(303, 'jasswithfriends/room/' + gameid);
	},
    destroyGame: async ({cookies, request}) => {
		const data = await request.formData();
        console.log("destroy game"); 
	},
    joinGame: async({cookies,request}) => {
        //todo: check that this user isn't already in a game, add leave game
        const data = await request.formData();
        const id = data.get("id");
        console.log(`player ${data.get("username")} (id ${data.get("userid")}) is joining`, id);
        gameManager.getGame(id).addPlayer(new Player(data.get('userid'), data.get("username")))
        redirect(303, '/jasswithfriends/room/' + id);
    },
    startGame: async({cookies,request}) => {
        //todo: check that the owner of the game is the one starting it
        let data = await request.formData()
        console.log("start game")
        let id = data.get('gameid');
        let game = gameManager.getGame(id)
        game.startGame()
        redirect(303, '/jasswithfriends/game/' + id);
    },
    playCard: async({cookies, request}) => {
        //todo: play the damn game

    },
    getState: async({cookies, request}) => {
        
    }

};	