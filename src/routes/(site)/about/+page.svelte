<script>
    import AM from '$lib/AM.svelte'
    import me from '$lib/me.png'
    let height = $state("30%");
     
</script>
<div>
<h1>About Me</h1>
<p>Hello! My name is Alexander M&uuml;ller. I am a Master's student in Computer Science at <a href="https://www.epfl.ch">EPFL</a>. My hobbies include climbing, skiing and hiking. 
My research interests include programming languages and formal verification. I also enjoy data and data visualization. I speak English, German and French.</p>
<br>
<img width={height} alt="me.png" src={me}/>
<!-- <AM></AM> -->
</div>
<style>
    div {
        text-align: center;
    }
    p {
        width: min(max(500px, 30vw), 90vw);
        margin: auto;
    }
</style>