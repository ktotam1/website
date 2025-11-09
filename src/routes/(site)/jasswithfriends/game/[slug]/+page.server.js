import { gameManager } from "../../games_manager"

export const load = ({params}) => { 
    const game = gameManager.getGame(params.slug)

    return {
        id: `${params.slug}`,
        game: game.getGameState()
    }
}