<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';

	let previousPage: string = `${base}/settings`;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
	const { nav } = $page.data.config;

	const chatRegex = new RegExp('^/chat/([^/]+)$');
</script>

{#if !chatRegex.test($page.url.pathname)}
	<div class="navbar bg-base-100">
		<div class="navbar-start">
			{#if $page.data.user && $page.url.pathname.split('/').length > 2}
				<button
					on:click={() => {
						goto(previousPage);
					}}
				>
					<Icon icon="icon-park-solid:back" width={24} />
				</button>
			{/if}
		</div>
		<div class="mx-auto navbar-center">
			<a class="text-xl normal-case" href="/">
				<img src={nav.static_icon} alt="" class="w-6 rotate-[60deg] mr-1 shadow-lg inline" />
				{nav.appName}
			</a>
		</div>

		<div class="navbar-end" />
	</div>
{/if}
