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
        try{
            cookies.delete("userid", {path: "/"})
            cookies.delete("username", {path: "/"})
        } catch(e){
            console.error(e)
        }
    },
    login: async ({cookies, request}) => {
        try{
        //todo: get cookie from verification server 
        //make ID different from cookie ?!
        let data = await request.formData()
        if(data.get('username')) {
            cookies.set('username', data.get('username'), {path: '/'})
        }
    } catch(e){
         console.error(e)
    }
    },
    createGame: async ({cookies, request}) => {
        let gameid;
        try{
            //todo: check that this user doesnt already have a game 
            console.log("GAME CREATED");
            const data = await request.formData(); 
            gameid = crypto.randomUUID();
            //redirect to room page
            // console.log(data)
            gameManager.createGame(new Player(data.get('userid'), data.get("username")), gameid);

        } catch(e){
            console.error(e)
        }
        redirect(303, 'jasswithfriends/room/' + gameid);

    },
    destroyGame: async ({cookies, request}) => {
        try{
            const data = await request.formData();
            console.log("destroy game"); 
        } catch(e){
            console.error(e)
        }
    },
    joinGame: async({cookies,request}) => {
        let gameid;
        try{
        //todo: check that this user isn't already in a game, add leave game
            const data = await request.formData();
            gameid = data.get("gameid");
            console.log(`player ${data.get("username")} (id ${data.get("userid")}) is joining`, gameid);
            gameManager.getGame(gameid).addPlayer(new Player(data.get('userid'), data.get("username")))
        } catch(e){
            console.error(e)
        }
        redirect(303, '/jasswithfriends/room/' + gameid);

    },
    startGame: async({cookies,request}) => {
        let gameid; 
        try{
        //todo: check that the owner of the game is the one starting it
            let data = await request.formData()
            console.log("start game")
            gameid = data.get('gameid');
            let game = gameManager.getGame(gameid)
            game.startGame()
        } catch(e){
            console.error(e)
        }
        redirect(303, '/jasswithfriends/game/' + gameid);
    },
    playCard: async({cookies, request}) => {
        try{
            let data = await request.formData()
            let gameid = data.get('gameid')
            let playerid = data.get('playerid')
            let game = gameManager.getGame(gameid)
            let card = JSON.parse(data.get('card'))
            console.log(typeof card)
            console.log("play card", JSON.stringify(card))

            game.play(playerid, card)
        } catch(e){
            console.error(e)
        }
    },
    chooseTrump: async({cookies,request}) => {

    },
    getState: async({cookies, request}) => {
        
    }

};	