<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	const routes = [
		// {
		// 	name: 'profile',
		// 	href: `/users/${$page.data.user._id}`,
		// 	regex: new RegExp('^/users/[^/]+$'),
		// 	icon: 'solar:user-circle-outline'
		// },
		{
			name: 'home',
			href: '/',
			regex: new RegExp('^/$'),
			icon: 'solar:home-outline'
		},
		{
			name: 'chat',
			href: '/chat',
			regex: new RegExp('^/chat$'),
			icon: 'solar:chat-round-dots-outline'
		},
		{
			name: 'settings',
			href: '/settings',
			regex: new RegExp('^/settings$'),
			icon: 'solar:hamburger-menu-outline'
		}
	];

	let active: string;
	$: {
		for (let route of routes) {
			if (route.regex.test($page.url.pathname)) {
				active = route.name;
				break;
			}
		}
	}
</script>

<div class="w-full join bg-base-300">
	<button class="btn join-item">
		<Icon icon="solar:gamepad-bold" width={24} />
	</button>
	<input class="w-full input input-bordered join-item" placeholder="Email" />
	<button class="btn join-item">
		<Icon icon="solar:plain-3-bold" width={24} />
	</button>
</div>
