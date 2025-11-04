const suits = ["shields", "bells", "roses", "acorns"]
const ranks = ["6","7","8","9","10","under","ober","koenig","ace"]
class Card {
    constructor(suit, rank){
        this.suit = suit
        this.rank = rank
    }
    name(){
        return this.rank + " of " + this.suit
    }
}

class Deck {
    constructor(){
        this.cards = []
        for(suit in suits){
            for(rank in ranks){
                this.cards.push(new Card(suit, rank))
            }
        }
    }
    shuffle(){
        let currentIndex = this.cards.length;
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [this.cards[currentIndex], this.cards[randomIndex]] = [
            this.cards[randomIndex], this.cards[currentIndex]];
        }
    }
    deal(){
        return [this.cards.slice(0,9), this.cards.slice(9,18), this.cards.slice(18,27), this.cards.slice(27,36)]
    }
}

class Player {
    constructor(playerID){
        this.id = playerID;
        this.hand = []
    }

    setHand(hand){
        this.hand = []
    }
}

class Game {
    constructor(gameOwner){
        this.gameOwner = gameOwner
        this.players = []
        this.maxPoints = 2000
        this.gameState = "lobby"

        this.deck = new Deck()

        this.playedCards = [];
        this.lastTrick = [];

        this.currentPlayerTurn = 0;
        this.turn = 0;
        this.round = 0;

        this.team_one_pts = 0;
        this.team_one_players = [];
        this.team_two_pts = 0;
        this.team_two_players = [];

        this.currentPlayerTurn = 0;

        this.addPlayer(gameOwner); 
    }

    setMaxPoints(points){
        this.maxPoints = points
    }

    addPlayer(player) {
        if(this.players.length < 4) {
            this.players.push(player)    
            if(this.team_one_players.length > this.team_two_players.length){
                this.team_two_players.push(player) 
            } else {
                this.team_one_players.push(player)
            }
        }
    }

    assignHands(){
        this.deck.shuffle();
        let hands = this.deck.deal();
        for(let i = 0; i < 4; i++){
            this.players[i].setHand(hands[i]);
        }
    }

    startGame(){
        if(this.players.length = 4) {
            this.gameState = "playing"
            this.assignHands()
        }
    }

    currentPlayer(){
        return this.players[this.currentPlayerTurn]
    }

    getGameState(){

    }

    play(player, card){
        //check if the right player is playing a card they own
        if(player.id != this.currentPlayer().id || !this.currentPlayer().hand.includes(card)) return;
        //check if the card is playable 
        if(false) return; 
        //


        this.currentPlayerTurn = (this.currentPlayerTurn+1)%4
        if(this.currentPlayerTurn == 0){

        }
    }
}

class GameManager { 
    constructor(){
        this.games = []
    }

    createGame(gameOwner){
        this.games.push(new Game(gameOwner));
    }

    destroyGame(gameOwner){
        this.games = this.games.filter(game => game.gameOwner != gameOwner)
    }

    getGame(gameOwner){
        this.games.find(game => game.gameOwner == gameOwner)
    }
}


export const gameManager = new GameManager();  