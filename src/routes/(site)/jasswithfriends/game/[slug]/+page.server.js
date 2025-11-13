import { gameManager } from "../../games_manager"

export const load = ({cookies, params, depends}) => { 
    const game = gameManager.getGame(params.slug)
    
    let userid = cookies.get('userid', {path: '/'})
    depends("app:game")
    return {
        id: `${params.slug}`,
        game: game?.getGameState(userid),
        game_not_found: !game
    }
}


// export const actions = 