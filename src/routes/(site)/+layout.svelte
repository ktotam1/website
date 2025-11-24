
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
            <a style={page.route.id == "/(site)" ? "text-decoration: underline" : ""} class="nav-elem" href={`/`}>Home</a>
            {#each ['About', 'Projects', 'Contact'] as link, i}
                <a style={page.route.id == "/(site)/" + link.toLowerCase() ? "text-decoration: underline" : ""} class="nav-elem" href={`/${link.toLowerCase()}`}>{link}</a>
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
    }
    .nav-elem {
        margin: .5em;
    }
    a {
        text-decoration: none;
        color: white;
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
