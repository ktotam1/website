<script>
    import { enhance } from '$app/forms';

    let {data} = $props()
    console.log(data)
</script>
<div>
    room id : {data.id}

    <form method="POST" action="/jasswithfriends?/startGame" 
        use:enhance={({formData}) => formData.append("gameid", data.id)}>
        <button> start game </button> 
    </form>
</div>
<style>
    div {
        text-align: center;
    }
</style>