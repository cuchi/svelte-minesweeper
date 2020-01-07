<script>
    import cssVars from 'svelte-css-vars'
    import Cell from './Cell.svelte'
    import { createNew, checkStatus, stepInto, toggleFlag } from './lib/game'

    export let width = 15
    export let height = 12
    export let bombsCount = Math.floor(width * height * 0.05)
    let styleVars = { width, height }
    let status = 'running'
    let cells = createNew(width, height, bombsCount)
    
    $: styleVars = { ...styleVars, color: getBoardColor(status) }
    
    $: status = checkStatus(cells)

    function getBoardColor(status) {
        if (status === 'lost') {
            return '#FFBB73'
        }
        if (status === 'win') {
            return '#06799F'
        }
        return '#FFFFFF'
    }

    function onRestart() {
        status = 'running'
        cells = createNew(width, height, bombsCount)
    }
    
    function onStep(event) {
        cells = stepInto(
            event.detail.id, 
            { width, height, bombsCount, cells })
    }

    function onToggleFlag(event) {
        cells = toggleFlag(
            event.detail.id, 
            { width, height, bombsCount, cells })
    }

    const noop = () => {}
</script>

<div 
    class="board" 
    use:cssVars={styleVars} 
    on:contextmenu={e => e.preventDefault()}
>
    {#each cells as cell (cell.id)}
        <Cell
            {...cell}
            on:stepInto={status === 'running' ? onStep : noop}
            on:toggleFlag={status === 'running' ? onToggleFlag : noop}
        />
    {/each}
</div>
<button 
    on:click={ onRestart } 
    disabled={ status === 'running' }
>
    Restart
</button>

<style>
    .board {
        margin: 1em 0;
        display: grid;
        grid-template-columns: repeat(var(--width), 1.5em);
        grid-template-rows: repeat(var(--height), 1.5em);
        background-color: var(--color);
        width: min-content;
        box-shadow: 0 0 1em;
        border-radius: 1em;
        padding: 0.5em;
    }
</style>
