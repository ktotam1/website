<script>
    import { untrack } from "svelte";
    import { interpret } from "./brainfuck";
    let input = $state("++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.")
    let output = $state("")
    let state = $state([])
    let dataPointer = $state(0)
    let errors = $state("")
    // svelte-ignore state_referenced_locally
    let instructionPointer = $state(input.length)
    $effect(() => {
       
        if(input.length ===  untrack(() => instructionPointer) + 1) instructionPointer++; 
        if(input.length <  untrack(() => instructionPointer)) instructionPointer = input.length; 
        console.log("ip",  untrack(() => instructionPointer))
    })
    $effect(() =>
    {
        let obj = interpret(input.slice(0,instructionPointer))
        state = obj.state;
        output = obj.output; 
        dataPointer = obj.pos;
        errors = obj.errors;
    })
</script>

<div class="view">
    <div class="left">
        <!-- svelte-ignore a11y_autofocus -->
        <div bind:innerText={input} contenteditable="true"  autofocus={true} class="input"></div>
        <div class="buttons">
            <button onclick={() => {instructionPointer=Math.min(input.length, instructionPointer+1); console.log('step', instructionPointer)}}>step</button>
            <button onclick={() => {instructionPointer=Math.max(0,instructionPointer-1); console.log('back', instructionPointer)}}>back</button>
            <button onclick={() => {instructionPointer=input.length}}>run to end</button>
        </div>
    </div>
    <div class="right">
        <div class="array">
            {#each state as cell,i}
                <div class={i == dataPointer ? "selected" : "cell"}>
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
<div class="bottom">
<h3>Brainfuck: A tiny programming language </h3>
Consisting of an infinite tape of bytes, an instruction pointer, and a data pointer, brainfuck offers the following commands:
<ul>
    <li>+ : increment current cell value by one</li>
    <li>- : decrement current cell value by one</li>
    <li>&gt; : increment data pointer by one</li>
    <li>&lt; : decrement data pointer by one</li>
    <li>. : print current cell as ascii </li>
    <li>, : accept one byte of input (not implemented)</li>
    <li>[ ] : square brackets function as while loops. If the current cell is zero (when the instruction is [) we skip to the next ]. Conversely, when reading ], we skip back to the previous matching [, if the current cell is non-zero.</li>

</ul> 
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
    .bottom {
        padding-left: 1rem;
    }
</style>