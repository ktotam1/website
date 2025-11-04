<script>
    let {data} = $props();
</script>
<div>
    {#if data?.username}
        hello, {data.username} <br>
        <form method="POST" action="?/logout">
            <button>logout</button>
        </form>
        create or join game 
        <br>
        <form method="POST" action="?/createGame">
            <button>create game</button>
        </form> 
        <br>
        <form method="POST" action="?/joinGame">
            <input required placeholder="game id" name="id"/> <br>
            <button>join game</button>
        </form> 
    {:else}
        Set a username: 
        <form method="POST" action="?/login">
        <input required name="username" placeholder="my username"/>
        <button>set</button>
        </form>
    {/if}
</div>


<style>
    div {
        text-align: center;
    }
</style>