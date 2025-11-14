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
    <div class="played cards">   

    </div>
    <div class="hand">
        {#each data.game.hand as card} 
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
             <form method="POST" use:enhance={({formData})=>{
                    formData.append("gameid", data.id)
                    formData.append("card", JSON.stringify(card))
             }} action="/jasswithfriends?/playCard">
            <button  class="card">{card.rank} of {card.suit}</button>    
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
    .hand {
        display: flex;
        flex-direction: row;
        /* align-items: ; */
    }
</style>
