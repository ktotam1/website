import { gameManager } from "../../games_manager"

export const load = ({cookies, params, depends}) => { 
    const game = gameManager.getGame(params.slug)
    depends("app:room")
    let userid = cookies.get('userid', {path: '/'})
    return {
        id: `${params.slug}`,
        game: game.getGameState(userid)
    }
}