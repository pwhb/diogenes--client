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

{#if $page.url.pathname.split('/').length < 3}
	<div class="mx-auto max-w-xl btm-nav btm-nav-sm">
		{#each routes as { href, icon, name, regex }}
			<a {href} class={active === name ? 'active' : ''}>
				<Icon {icon} width={24} />
			</a>
		{/each}
	</div>
{/if}
