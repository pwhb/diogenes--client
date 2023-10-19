<script lang="ts">
	import { page } from '$app/stores';
	import BottomBar from '$lib/components/layout/BottomBar.svelte';
	import ChatAppBar from '$lib/components/layout/ChatAppBar.svelte';
	import ChatBody from '$lib/components/layout/ChatBody.svelte';
	import WsKeys from '$lib/consts/WsKeys';
	import { MessageStatus } from '$lib/helpers/message';

	import {
		membersStore,
		messageStore,
		socketStore,
		typingStore
	} from '$lib/services/stores/message';
	import { onMount } from 'svelte';

	onMount(() => {
		messageStore.set($page.data.messages);
		const members: any = {};
		for (let member of $page.data.room.members) {
			members[member._id] = member;
		}
		membersStore.set(members);
		const lastMessage = $page.data.messages[$page.data.messages.length - 1];
		if ($socketStore) {
			if (
				!lastMessage.seen.includes($page.data.user._id) &&
				lastMessage.senderId !== $page.data.user._id
			) {
				console.log('new message sent signal');

				$socketStore?.send(
					JSON.stringify({
						type: WsKeys.status,
						data: {
							messageId: lastMessage._id,
							status: MessageStatus.seen,
							roomId: $page.data.room._id
						}
					})
				);
			}
		}
	});
</script>

<div class="flex flex-col mx-auto max-w-xl h-screen">
	<ChatAppBar />

	<ChatBody />
	{#if $typingStore.length}
		<p class="mx-2">
			<span class="font-semibold">
				{$typingStore.map((id) => $membersStore[id].username).join(',')}
			</span>
			{$typingStore.length > 1 ? 'are' : 'is'} typing ...
		</p>
	{/if}
	<BottomBar />
</div>
