<script>
    import { enhance } from '$app/forms';

    let {data} = $props();

    
</script>
<div>
        hello, {data.username} <br>
        <form method="POST" action="?/logout">
            <button>logout</button>
        </form>
        create or join game 
        <br>
        <form method="POST" action="?/createGame" use:enhance={({formData}) => {
            formData.append("userid", data.userid)
            formData.append("username", data.username)
        }}>
            <button>create game</button>
        </form> 
        <br>
        <form method="POST" action="?/joinGame" use:enhance={({formData}) => {
            formData.append("userid", data.userid)
            formData.append("username", data.username)
        }}>
            <input required placeholder="game id" name="gameid"/> <br>
            <button>join game</button>
        </form> 
        <div class="rules">
            <h2>How to play</h2>
            <p>
            Jass is a Swiss trick-taking card game, played with a 36 card deck. 
            4 players play in 2 teams of 2, sitting across from each other. 
            In one trick, each player will take a turn (anticlockwise) to place one card into the center,
            and the cards will be taken by the player that has played the highest card. The player who takes a trick leads the next one.
            The suit of the first card must be respected in order to win the trick, and players must follow suit if they can. 
            Additonally, at the beginning of every hand, one player chooses a trump suit, which can beat the other suits, and can ignore the follow-suit rule. 
            The cards have the following order: 
            </p>
            <div>6 7 8 9 10 Under/Jack Ober/Queen Koenig/King As/Ace</div>   
            and the following values:
            <div>6: 0 7: 0 8: 0 9: 0 10: 10 Under: 2 Ober: 3 Koenig: 4 As: 11</div>
            <p>However, the order changes in the Trump suit:</p>
            <div>6 7 8 10 Ober/Queen Koenig/King As/Ace 9 Under/Jack</div>
            The 9 of the trump suit is worth 14 and the Under 20
        </div>
</div>


<style>
    p {
        width: 75vw;
        margin: auto;
    }
    div {
        text-align: center;
    }
</style>