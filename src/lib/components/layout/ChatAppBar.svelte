<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import Avatar from '../common/Avatar.svelte';

	let previousPage: string = `${base}/settings`;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

</script>

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
		{#if $page.data.data.type === 'friendship'}
			<a class="text-xl normal-case" href={`/users/${$page.data.data.members[0]._id}`}>
				<Avatar
					avatar={$page.data.data.members[0].avatar}
					username={$page.data.data.members[0].username}
					width={'8'}
				/>
				{$page.data.data.members[0].username}
			</a>
		{:else}
			<p class="text-xl normal-case">
				<Avatar avatar={$page.data.data.image} username={$page.data.data.name} width={'8'} />
				{$page.data.data.name}
			</p>
		{/if}
	</div>

	<div class="navbar-end" />
</div>
