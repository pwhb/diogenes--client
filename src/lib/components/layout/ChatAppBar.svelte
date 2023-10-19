<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import Avatar from '../common/Avatar.svelte';

	let previousPage: string = `${base}/chat`;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<button
			on:click={() => {
				goto(previousPage);
			}}
		>
			<Icon icon="icon-park-solid:back" width={24} />
		</button>
	</div>
	<div class="mx-auto navbar-center">
		{#if $page.data.room}
			{#if $page.data.room.type === 'friendship'}
				<a class="flex gap-2 text-xl normal-case" href={`/users/${$page.data.room.members[0]._id}`}>
					<Avatar
						avatar={$page.data.room.members[0].avatar}
						username={$page.data.room.members[0].username}
						width={'8'}
					/>
					{$page.data.room.members[0].username}
				</a>
			{:else}
				<p class="flex gap-2 text-xl normal-case">
					<Avatar avatar={$page.data.room.image} username={$page.data.room.name} width={'8'} />
					{$page.data.room.name}
				</p>
			{/if}
		{/if}
	</div>

	<div class="navbar-end" />
</div>
