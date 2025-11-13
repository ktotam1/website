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
            <input required placeholder="game id" name="id"/> <br>
            <button>join game</button>
        </form> 
</div>


<style>
    div {
        text-align: center;
    }
</style>