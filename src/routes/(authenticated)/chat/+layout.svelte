<script lang="ts">
	import { onMount } from 'svelte';
	import { messageStore, socketStore, typingStore } from '$lib/services/stores/message';
	import { page } from '$app/stores';
	import WsKeys from '$lib/consts/WsKeys';
	import type { IMessage } from '$lib/services/ws/message';
	import { MessageStatus, TypingStatus } from '$lib/helpers/message';
	import { PUBLIC_WS_URL } from '$env/static/public';

	onMount(() => {
		if (!$socketStore) {
			const url = `${PUBLIC_WS_URL}?token=${$page.data.token}`;
			const ws = new WebSocket(url);
			socketStore.set(ws);
		}

		if ($socketStore) {
			$socketStore.addEventListener('open', (e) => {
				console.log('open', e);
				$socketStore?.send(
					JSON.stringify({
						type: WsKeys.join,
						rooms: $page.data.rooms.map((v: any) => v._id)
					})
				);
				// if ($page.data.messages.length) {
				// 	const lastMessage = $page.data.messages[$page.data.messages.length - 1];
				// 	if (
				// 		!lastMessage.seen.includes($page.data.user._id) &&
				// 		lastMessage.senderId !== $page.data.user._id
				// 	) {
				// 		$socketStore?.send(
				// 			JSON.stringify({
				// 				type: WsKeys.status,
				// 				data: {
				// 					messageId: lastMessage._id,
				// 					status: MessageStatus.seen,
				// 					roomId: $page.data.room._id
				// 				}
				// 			})
				// 		);
				// 	}
				// }
			});
			$socketStore.addEventListener('message', (e) => {
				const message: IMessage = JSON.parse(e.data);

				switch (message.type) {
					case WsKeys.join: {
						console.log('join', message.data);
						break;
					}
					case WsKeys.message: {
						const newMessage = {
							...message.data,
							new: true
						};
						messageStore.update((value) => [...value, newMessage]);

						if (message.data.senderId !== $page.data.user._id) {
							$socketStore?.send(
								JSON.stringify({
									type: WsKeys.status,
									data: {
										messageId: message.data._id,
										status: MessageStatus.delivered,
										roomId: $page.data.room._id
									}
								})
							);
						}
						break;
					}
					case WsKeys.status: {
						if ($messageStore) {
							const lastMessage = $messageStore[$messageStore.length - 1];
							if (lastMessage._id === message.data._id) {
								messageStore.update((value) => {
									value[value.length - 1]['status'] = message.data.status;
									return value;
								});
							}
						}

						break;
					}
					case WsKeys.typing: {
						if (
							message.data.status === TypingStatus.start &&
							!$typingStore.includes(message.data.senderId)
						) {
							typingStore.update((value) => [...value, message.data.senderId]);
						} else if (
							message.data.status === TypingStatus.stop &&
							$typingStore.includes(message.data.senderId)
						) {
							typingStore.update((value) => value.filter((v) => v !== message.data.senderId));
						}

						break;
					}
					default: {
						console.log('default', e.data);
					}
				}
			});
			$socketStore.addEventListener('close', (e) => {
				console.log('close', e);
			});
			$socketStore.addEventListener('error', (e) => {
				console.log('error', e);
			});
		}
	});
</script>

<slot />
