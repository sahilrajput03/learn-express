<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="p-3">
	{@render children()}
</main>
