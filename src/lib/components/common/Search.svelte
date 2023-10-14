<script lang="ts">
	import Icon from '@iconify/svelte';
	export let onSearch: any = () => {};
	export let search = '';
	export let isLoading = false;
</script>

<div class="rounded-full join">
	<input class="input input-primary join-item" placeholder="Search" bind:value={search} />
	<button class="rounded-r-full btn btn-primary join-item" on:click={onSearch} disabled={isLoading}>
		{#if isLoading}
			<span class="loading loading-spinner" />
		{:else}
			<Icon icon="fe:search" width={24} />
		{/if}
	</button>
</div>
