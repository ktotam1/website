<script>
    import { onMount } from 'svelte';
    
	onMount(() => {
        let scrollTo = false;
        (function scroll(){
            if(scrollTo) {
                document.getElementById('$1')?.scrollIntoView({ behavior: 'smooth'})
            } else {
                document.getElementById('$2')?.scrollIntoView({ behavior: 'smooth'})
            }
            scrollTo = !scrollTo
            setTimeout(scroll, 2000);
        })();
	});
</script>
<h1 class="name"> ALEXANDER <br> M&Uuml;LLER</h1>
{#each {length: 4}, n}
<section id='${n}'>
</section>
{/each}
<style>
    :root::-webkit-scrollbar {
        display: none;
    }
     h1 {
        font-size: 9vw;
        text-align: center;
        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none;
        /* display: inline; */
    }
    .name{ 
        color: white;
        position: fixed;
        top: 50%;
        left: 50%;
        mix-blend-mode: difference;
        transform: translate(-50%, -75%) 
    } 
    section {
        height: 50vh;
    }
    section:nth-child(even){
        background-color: black;
    }
    section:nth-child(odd){
        background-color: white;
    }
</style>