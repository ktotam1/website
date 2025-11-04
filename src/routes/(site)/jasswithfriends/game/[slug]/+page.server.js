import { gameManager } from "../../games_manager"

export const load = ({params}) => { 
    return {
        id: `${params.slug}`,
        // game: gameManager.getGame(params.slug)
    }
}