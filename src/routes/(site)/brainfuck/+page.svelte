<script>
    import { interpret } from "./brainfuck";
    let input = $state("")
    let output = $state("")
    let state = $state([])
    let pos = $state(0)
    let errors = $state("")
    let interPos = $state(0)
    $effect(() => {
        if(input.length === interPos + 1) interPos++; 
        if(input.length < interPos) interPos = input.length; 
        
    })
    $effect(() =>
    {
        let obj = interpret(input.slice(0,interPos))
        state = obj.state;
        output = obj.output; 
        pos = obj.pos;
        errors = obj.errors;
    })
</script>

<div class="view">
    <div class="left">
        <!-- svelte-ignore a11y_autofocus -->
        <div bind:innerText={input} contenteditable="true"  autofocus={true} class="input"></div>
        <div class="buttons">
            <button onclick={() => interPos=Math.min(input.length, interPos+1)}>step</button>
            <button onclick={() => interPos=Math.max(0,interPos-1)}>back</button>
            <button onclick={() => {interPos=input.length}}>run to end</button>
        </div>
    </div>
    <div class="right">
        <div class="array">
            {#each state as cell,i}
                <div class={i == pos ? "selected" : "cell"}>
                    {cell}
                </div>
            {/each}
        </div>
        {#if errors}
        <div class="errors">
            {errors}
        </div>
        {/if}
        {output}
    </div>
</div>

<style>
    .view {
        display: flex;
        height: 50vh;
        padding: 1rem;
    }
    .left {
        width: 50%
    }
    .right{ 
        width: 50%;
        text-align: center;
    }
    .input {
        border: solid 2px #F0F0F0;
        resize: none;
        height: 90%;
        width: 90%;
        font-family: monospace;
        /* background-color: #FAFAFA; */
        margin: 0;
        /* border-radius: 0; */
    }
    .input:focus{
        border: solid 2px #F0F0F0;
        outline: none;
        font-family: monospace;
    }
    .array{
        display: flex;
        flex-direction: row;
        margin: auto;
        justify-content: center;
    }
    .cell{
        border: solid 1px black;
        width: 2rem;
        height: 1rem;
        text-align: center;
    }
    .selected{
        border: solid 1px green;
        width: 2rem;
        height: 1rem;
        text-align: center;
    }
    .errors {
        color: red;
    }
</style>