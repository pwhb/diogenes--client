<script lang="ts">
	import { page } from '$app/stores';
	import WsKeys from '$lib/consts/WsKeys';
	import { TypingStatus } from '$lib/helpers/message';
	import { membersStore, socketStore, typingStore } from '$lib/services/stores/message';
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

	let drawerOpen = false;

	let active: string;
	$: {
		for (let route of routes) {
			if (route.regex.test($page.url.pathname)) {
				active = route.name;
				break;
			}
		}
	}

	let messageText = '';

	async function handleSubmit() {
		if ($socketStore) {
			$socketStore.send(
				JSON.stringify({
					type: WsKeys.message,
					data: {
						roomId: $page.data.room._id,
						body: messageText
					}
				})
			);
		}
		messageText = '';
	}
	const timeoutms = 2000;
	let timeout: any;
	let typing = false;
	function timeoutFunction() {
		typing = false;
		if ($socketStore) {
			$socketStore.send(
				JSON.stringify({
					type: WsKeys.typing,
					data: {
						roomId: $page.data.room._id,
						status: TypingStatus.stop
					}
				})
			);
		}
		// socket.emit('stop-typing', { roomId: room._id, username: user.username });
	}

	function onKeyDownNotEnter() {
		if (typing) {
			clearTimeout(timeout);
			timeout = setTimeout(timeoutFunction, timeoutms);
		} else {
			typing = true;
			if ($socketStore) {
				$socketStore.send(
					JSON.stringify({
						type: WsKeys.typing,
						data: {
							roomId: $page.data.room._id,
							status: TypingStatus.start
						}
					})
				);
			}
			// socket.emit('start-typing', { roomId: room._id, username: user.username });
			timeout = setTimeout(timeoutFunction, timeoutms);
		}
	}
</script>

<form class="w-full join bg-base-300" on:submit={handleSubmit}>
	<button class="btn join-item" on:click={() => (drawerOpen = !drawerOpen)} type="button">
		<Icon icon="solar:gamepad-bold" width={24} />
	</button>

	<input
		class="w-full input input-bordered join-item"
		placeholder=""
		bind:value={messageText}
		on:input={onKeyDownNotEnter}
	/>
	<button class="btn join-item" type="submit">
		<Icon icon="solar:plain-3-bold" width={24} />
	</button>
</form>

{#if drawerOpen}
	<p>Drawer</p>
{/if}
