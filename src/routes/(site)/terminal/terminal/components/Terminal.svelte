<script lang="ts">
    import TerminalLine from "./TerminalLine.svelte";
    let commandHistory: object[] = $state([]);
    let currentPath = "~/"
    let currentCommand = $state("")
    let input: any; 
    function handler(e: KeyboardEvent){
         // executeCommand(currentCommand)
        if (e.keyCode == 13) {
            console.log("hello")
            commandHistory.push({path: structuredClone(currentPath), text: structuredClone(currentCommand)})
            currentCommand = ""
        }
    }
    
</script>

<div>
{#each commandHistory as command}
    <TerminalLine {command}></TerminalLine>
{/each}
</div>
<div>{currentPath} {"$:"} <input 
        onfocusout={() => input.focus()} 
        onkeydown={handler}
        bind:this={input} 
        bind:value={currentCommand} 
        autofocus    
        autocorrect={"off"} 
        
        />
</div>

<style>

input {
    border-style: none; 
    outline: none;
    padding: none; 
    margin: none; 
    font-family: inherit;
    font-size: inherit;
    background-color: pink;
    height: var(--font-size);
}
</style>