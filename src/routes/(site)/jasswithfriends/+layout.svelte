<script>
    let {data, children} = $props();
</script>
<div>
    {#if data?.username}
        {@render children()}
    {:else}
        Set a username: 
        <form method="POST" action="/jasswithfriends?/login">
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