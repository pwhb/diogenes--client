<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';

	let previousPage: string = base;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
	const { nav } = $page.data.config.data;
</script>

<div class="navbar bg-base-100">
	{#if $page.url.pathname.split('/').length > 2}
		<div class="navbar-start">
			<button
				on:click={() => {
					goto(previousPage);
				}}
			>
				<Icon icon="icon-park-solid:back" width={24} />
			</button>
		</div>
	{/if}
	<div class="mx-auto navbar-center">
		<a class="text-xl normal-case" href="/">
			<img src={nav.icon} alt="" class="w-6 rotate-[60deg] mr-1 shadow-lg inline" />
			{nav.appName}
		</a>
	</div>
	{#if $page.url.pathname.split('/').length > 2}
		<div class="navbar-end" />
	{/if}
</div>
