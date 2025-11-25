<script>
    import { onMount } from 'svelte';
	onMount(() => {
        setTimeout(() => document.getElementById('$1')?.scrollIntoView({ behavior: 'smooth'}), 10)
		document.body.style.overflow = 'hidden';

        let scrollTo=false;
        let interval = setInterval(() => {
            if(scrollTo) {
                document.getElementById('$1')?.scrollIntoView({ behavior: 'smooth'})
            } else {
                document.getElementById('$2')?.scrollIntoView({ behavior: 'smooth'})
            }
            scrollTo = !scrollTo
        }, 3000)

        return () => {
            document.body.style.overflow = '';

            clearInterval(interval)
        }
    });
</script>
<h1 class="name"> ALEXANDER <br> M&Uuml;LLER</h1>
{#each {length: 5}, n}
<section id='${n}'>

</section>
{/each}
<!-- <svelte:body use:style={"overflow: hidden"} /> -->
<!-- <svelte:window use:style={"overflow: hidden"} /> -->

<style>
    /* :global(body){
        overflow: hidden;
    } */
    :root::-webkit-scrollbar {
        display: none;
    }
    h1 {
        font-size: max(50px,9vw);
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
        top: 50vh;
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