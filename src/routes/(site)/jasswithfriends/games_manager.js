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
    getCard(){
        return {suit: this.suit, rank: this.rank}
    }
}

class Deck {
    constructor(){
        this.cards = []
        for(const suit of suits){
            for(const rank of ranks){
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

export class Player {
    constructor(playerID, username){
        this.id = playerID;
        this.hand = []
        this.username  = username
    }

    setHand(hand){
        this.hand = hand
    }

    remove(card){
        this.hand = this.hand.filter(x => x.rank != card.rank || x.suit !=card.suit)
    }

    getPlayer() {
        return {
            username: this.username,
            playerID: this.playerID 
        }
    }
}

class Game {
    constructor(gameOwner, gameID){
        this.gameID = gameID
        this.gameOwner = gameOwner
        this.players = []
        this.maxPoints = 2000
        this.gameState = "lobby"
        this.currentTrump = "none"
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
        console.log("players", this.players)

        for(let i = 0; i < this.players.length; i++){
            // console.log(hands[i])
            this.players[i]?.setHand(hands[i]);

        }
    }

    startGame(){
        if(true || this.players.length == 4) { //todo: remove true
            this.gameState = "playing"
            this.assignHands()
        }
    }

    currentPlayer(){
        return this.players[this.currentPlayerTurn] //todo: fix this
    }

    getGameState(playerID){
        return {
            gameID: this.gameID,
            players: this.players.map(player => player.getPlayer()),
            gameState: this.gameState,
            playedCards: this.playedCards,
            hand: this.players.find(player=>player.id==playerID).hand.map(c => c.getCard()),
            isMyTurn: true,
            playableCards: [],
            shouldPickTrump: false,
            currentTrump: this.currentTrump,
        }
    }

    setTrump(player, trump){
        //check if it is the players turn to set the trump 
        this.currentTrump = trump
    }

    legalCards(hand, playedCards, trump){
        //if first card is suit trump
        if(suits.includes(trump) && playedCards[0].suit == trump) {
            //if the only trump is the jack, all cards are valid
            if(hand.filter(x => x.suit == trump).length == 1 && hand.find(x=>x.suit==trump).rank=="under")  { return hand; }   
            //otherwise, if have trump, must play trump
            else if(hand.filter(x.suit == trump).length > 0) { return hand.filter(x => x.suit == trump); }
            else { return hand; }
        } else {
            //first card is not a trump => can play trump or that suit, if we have it

        }
    }

    play(player, card){
        //check if the right player is playing a card they own
        // if(player.id != this.currentPlayer().id || !this.currentPlayer().hand.includes(card)) return;
        //check if the card is playable 
        if(false) return; 
        //
        this.playedCards.push({card,player})
        player = this.players.find(x=>x.playerID == player);
        player.remove(card)
        //determine who won the trick
        //set it as that player's turn
        if(this.playedCards.length == 4){

        }
        // this.currentPlayerTurn = (this.currentPlayerTurn+1)%4
        // if(this.currentPlayerTurn == 0){

        // }
    }
}

class GameManager { 
    constructor(){
        this.games = []
    }

    createGame(gameOwner, gameID){
        this.games.push(new Game(gameOwner, gameID));
    }

    destroyGame(gameOwner){
        this.games = this.games.filter(game => game.gameOwner != gameOwner)
    }

    getGame(gameID){
        let game = this.games.find(game => game.gameID == gameID)
        return game
    }

    getGameByOwner(gameOwner){
        return this.games.find(game => game.gameOwner == gameOwner)
    }
}

export const gameManager = new GameManager();  