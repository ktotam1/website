
<script>
    import { applyAction } from "$app/forms";
    import Chevron from "$lib/Chevron.svelte";
    import { fade, slide } from 'svelte/transition';
    import { page  } from '$app/state';
   
    /** @type {boolean} */
    let open = $state(false);
    let { children } = $props();
</script>
<div class='navbar' >
    {#if open}
        <nav out:slide={{duration: 200, axis:'y'}} in:slide={{duration: 200, axis:'y'}} class='navbar-contents'>
            <!-- <a style={page.route.id == "/(site)" ? "text-decoration: underline" : ""} class="nav-elem" href={`/`}>Home</a> -->
            {#each [{txt: 'Home', link: '/', linkc: ''}, {txt: 'About', link: '/about', linkc: '/about'}, {txt: 'Projects', link: '/projects', linkc: '/projects'}, {txt: 'Contact', link: '/contact', linkc: '/contact'}] as link, i}
                <a style={page.route.id == "/(site)" + link.linkc ? "text-decoration: underline" : ""} class="nav-elem" href={`${link.link}`}>{link.txt}</a>
            {/each}
        </nav>
    {/if}
    <button class="chevron-button" onclick={() => open = !open}>
         <Chevron open={open} style='color: white; mix-blend-mode: difference;' />
    </button>

</div>
<div style="margin-top: 5em">
{@render children()}
</div>
<style>
    :global(body) {padding: 0; margin: 0; height: 100%; background-color: white;}
    .chevron-button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        margin: auto;
        justify-self: center;
        mix-blend-mode: difference;

    }
    .nav-elem {
        margin: .5em;
    }
    a {
        text-decoration: none;
        color: white;
        mix-blend-mode: difference;

        font-size: min(5vw, 24px);
         -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none;
    }
    a:visited {
        color: white
    }
    .navbar-contents {
        margin-top: 1rem ;
    }
    .navbar{
        display: flex;
        flex-direction: column;
        position: fixed;
        left: 50%;
        transform: translate(-50%, 0);
        color: black;
        width: 100%;
        top: 0rem;
        mix-blend-mode: difference;
        align-items: center;
    }
</style>
