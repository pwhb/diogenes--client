<script>
	import { page } from '$app/stores';
	import Avatar from '$lib/components/common/Avatar.svelte';
	import Wrapper from '$lib/components/layout/Wrapper.svelte';
	import Icon from '@iconify/svelte';
	const menus = $page.data.config.settings.menus;
	console.log(menus);
</script>

<Wrapper title="Settings">
	<ul class="w-full menu bg-base-200 rounded-box">
		<li>
			<a href={`/users/${$page.data.user._id}`}>
				<Avatar avatar={$page.data.user.avatar} username={$page.data.user.username} />
				<span class="font-bold">
					{$page.data.user.username}
				</span>
			</a>
		</li>
		<div class="my-0 divider" />
		{#each menus as menu}
			<li>
				<a href={menu.href} class="capitalize">
					<Icon icon={menu.icon} width={24} />{menu.name}
				</a>
			</li>
		{/each}
		<!-- <li>
			<a href="/settings/themes">
				<Icon icon="mdi:paint-outline" width={24} />Themes
			</a>
		</li> -->
		<div class="my-0 divider" />
		<form action="/logout" method="POST">
			<li>
				<button type="submit">
					<Icon icon="solar:logout-outline" width={24} />
					<span> Logout </span>
				</button>
			</li>
		</form>
	</ul>
</Wrapper>
