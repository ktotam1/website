<script>
    import {add}  from '$lib/utils/Notifications/acts'
    import Notifications from '$lib/utils/Notifications/Notifications.svelte'
    let {data, form} = $props()
    $effect(()=>{
        if(form?.success){
            console.log("success!")
            add({mode: "success", message: "Message sent!", lifetime: 2})
        }
        if(form?.error){
            add({mode: "error", message: "Message failed. Please try again later.", lifetime: 3})
        }
        if(form?.bad){
            console.log("bad")
            add({mode: "error", message: "Please fill out all the fields", lifetime: 3})
        }
    })
</script><div>
<form method="POST" action="?/submit">
	<label>
		Name <br>
		<input name="name" required>
	</label> <br>
    <label>
		Subject <br>
		<input name="subject" required>
	</label> <br>
	<label>
		Email <br>
		<input name="email" type="email" required>
	</label > <br>
    <label> 
        Message <br>
        <textarea name="msg" required></textarea>
    </label> <br>
	<button>Submit</button>
</form>
<Notifications />
</div>

<style>
    div {
        margin-top: 3vh;
        text-align: center;
    }
    textarea {
        width: 30vw;
        height: 20vh;
    }
    label{
        /* hyphens: none; */
    }
</style>