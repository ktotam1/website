<script>
    import { invalidate } from '$app/navigation';
    import { redirect } from '@sveltejs/kit';
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';

    let {data} = $props()
    let interval; 
    onMount(() => {
        interval = setInterval(() => invalidate("app:game"), 1000)
        },
        () => {
            clearInterval(interval)
        } 
    )

    $effect(()=>{
        console.log(data.game)
        console.log(data.id)
    })
</script>
<div class="screen">
game id : {data.id}

<div class="game">
    <div class="gamearea">
        <div class="player0">Card player 1</div>
        <div class="player1">teammate<br>Card</div>
        <div class="player2">player 2 Card</div>
        <div class="player3">Card<br> me </div>   
        <!-- <div>player1 name</div>
        <div>
            <div>player2 name</div>
            <div>
                cards
                {#each data.game.playedCards as card}
                    <div class="card">
                        {card.card.rank} of {card.card.suit}
                    </div>
                {/each}
            </div>
            <div>player3 name</div>
        </div> -->
    </div>
    <div class="hand">
        {#each data.game.hand as card} 
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
             <form class="card" method="POST" use:enhance={({formData})=>{
                    formData.append("gameid", data.id)
                    formData.append("card", JSON.stringify(card))
             }} action="/jasswithfriends?/playCard">
            <button >{card.rank} of {card.suit}</button>    
            </form>
        {/each}
    </div>
</div>
</div>
<style>
    .screen {
        text-align: center;
    }
    .card{
        text-align: center;
        border: solid 1px black;
    }
    .game {
        display: flex;
        flex-direction: column;
    }
    .gamearea {
        background-color: pink;
        height: 50vh;
        position: relative;
        * {
            display: block; 
            position: absolute;
            top: 50%; left: 50%;
        }   
        .player0 {
            translate: 30vw;
            color: red;
        }
        .player1 {
            color: blue;
            transform: rotate(-90deg) translate(12em) rotate(90deg);
        }
        .player2{
            color: green; 
            transform: translate(-30vw);
        }
        .player3{
            color: yellow;
            transform: rotate(90deg) translate(10em) rotate(-90deg);
        }
    }
    .hand {
        height: 10%;
        display: flex;
        flex-direction: row;
        margin: auto;
        /* align-items: ; */
    }
    .card{
        width: 7rem;
        height: 14rem;
        justify-content: center;
        align-items: center;

    }



    
</style>
