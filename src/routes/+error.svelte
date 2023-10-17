<script>
	import { page } from '$app/stores';
</script>

<!-- Your content goes here -->
{#if $page.error?.message === 'Not Found'}
	<img
		src="https://diogenes-bun.onrender.com/api/v1/uploads/652cfba04620538fc398024a"
		alt="not-found"
		class=""
	/>
{:else}
	<img
		src="https://diogenes-bun.onrender.com/api/v1/uploads/652cfba04620538fc398024b"
		alt="server-error"
	/>
{/if}
