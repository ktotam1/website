<script>
    import { enhance } from '$app/forms';
    import { invalidate, goto } from '$app/navigation';
    import { redirect } from '@sveltejs/kit';
    import { onMount} from 'svelte';
    let {data} = $props();
    onMount(() => {
        let interval = setInterval(() => invalidate("app:room"), 1000)
        },
        () => {
            clearInterval(interval)
        } 
    )
    
    $effect(()=>{
        console.log('gamedata:', data.game)
        if(data.game.gameState === 'playing'){
            goto('/jasswithfriends/game/' + data.game.gameID)
        }
    })
    
</script>
<div>
    room id : {data.id}

    <form method="POST" action="/jasswithfriends?/startGame" 
        use:enhance={({formData}) => {
            formData.append("gameid", data.id)
        }}>
        <button> start game </button> 
    </form>
    {#each data.game.players as player}
        <p>{player?.username}</p>
    {/each}
</div>
<style>
    div {
        text-align: center;
    }
</style>