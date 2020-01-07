<script>
    import { createEventDispatcher } from 'svelte'

    export let id
    export let isHidden = true
    export let isBomb = false
    export let hasFlag = false
    export let bombsNearby = 0

    const dispatch = createEventDispatcher()

    function step() {
        if (!hasFlag) {
            dispatch('stepInto', { id })
        }
    }
    
    function flag(event) {
        event.preventDefault()
        if (isHidden) {
            dispatch('toggleFlag', { id })
        }
    }

</script>

<div 
    class={isHidden ? 'cell hidden' : 'cell'}
    on:click={step}
    on:contextmenu={flag}
>
    {#if isBomb && !isHidden}
        💥
    {/if}
    {#if hasFlag}
        🚩
    {/if}
    {#if !isHidden && bombsNearby > 0}
        {bombsNearby}
    {/if}
</div>

<style>
    .cell {
        background-color: #61B4CF;
        color: #333333;
        margin: 0.5px;
        display: flex;
        text-align: center;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        user-select: none;
    }

    .hidden {
        background-color: #024E68;
        color: #DDDDDD;
    }
</style>
