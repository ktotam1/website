import { gameManager } from "../../games_manager"

export const load = ({params, depends}) => { 
    const game = gameManager.getGame(params.slug)
    depends("app:room")
    return {
        id: `${params.slug}`,
        game: game.getGameState()
    }
}