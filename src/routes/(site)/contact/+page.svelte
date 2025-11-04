<div>
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
</style>