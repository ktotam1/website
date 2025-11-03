
<script>
    import Chevron from "$lib/Chevron.svelte";
    import { fade, slide } from 'svelte/transition';
    /** @type {boolean} */
    let open = $state(false);
    let { children } = $props();
</script>
<div class='sidebar' >
    {#if open}
        <nav out:slide={{duration: 200, axis:'y'}} in:slide={{duration: 200, axis:'y'}} class='sidebar-contents'>
            <a class="nav-elem" href={`/`}>Home</a>
            {#each ['About', 'Projects', 'Contact'] as link, i}
                <a class="nav-elem" href={`/${link.toLowerCase()}`}>{link}</a>
            {/each}
        </nav>
    {/if}
    <button class="chevron-button" onclick={() =>open = !open}>
         <Chevron open={open} style='color: white; mix-blend-mode: difference;' />
    </button>

</div>

{@render children()}

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
        font-size: min(3vw, 24px);
    }
    a:visited {
        color: white
    }
    .sidebar{
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0rem;
        left: 50%;
        transform: translate(-50%, 0);
        color: black;
        mix-blend-mode: difference;
        align-items: center;
    }
</style>
