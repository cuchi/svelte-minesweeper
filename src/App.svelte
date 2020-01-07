<script>
	import Board from './Board.svelte'
	const target = '_blank'
</script>

<main>
	<p>This is a simple minesweeper game made I made with <a href="https://svelte.dev/" target>Svelte</a>.</p>
	<p>Check out the <a href="https://github.com/cuchi/svelte-minesweeper" target>source code</a> and leave a star :)</p>
	<hr/>
	Controls:
	<ul>
		<li><b>Left click</b>: uncover</li>
		<li><b>Right click</b>: toggle flag</li>
	</ul>
	<Board width={20} height={17} />
</main>

<style>
	main {
		margin: auto;
		width: fit-content;
		font-family: sans-serif;
	}
</style>