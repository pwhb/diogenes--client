<script lang="ts">
	import { page } from '$app/stores';
	import WsKeys from '$lib/consts/WsKeys';
	import { since } from '$lib/helpers/date';
	import { MessageStatus, scrollIntoView } from '$lib/helpers/message';
	import { membersStore, socketStore } from '$lib/services/stores/message';
	import Icon from '@iconify/svelte';

	import { onMount } from 'svelte';

	export let message: any;
	export let last = false;

	onMount(() => {
		if (last) {
			scrollIntoView(message._id);
			// if (!message.seen.includes($page.data.user._id) && message.senderId !== $page.data.user._id) {
			// 	if ($socketStore && $socketStore.readyState === $socketStore.OPEN) {
			// 		console.log('$socketStore.readyState', $socketStore.readyState);

			// 	}
			// } else {
			// 	console.log('already seen');
			// }
		}
	});
</script>

{#if message.senderId === $page.data.user._id}
	<div class="chat chat-end" id={message._id}>
		<div class="chat-header">
			{'You'}
			<time class="text-xs opacity-50">{since(message.createdAt)}</time>
		</div>
		<div class="chat-bubble">{message.body}</div>
		{#if last}
			<div class="opacity-50 chat-footer">
				{#if message.status === MessageStatus.sent}
					<Icon icon="solar:unread-line-duotone" />
				{:else if message.status === MessageStatus.delivered || message.status === MessageStatus.seen}
					<Icon icon="solar:unread-bold" />
				{:else}
					sending
				{/if}
			</div>
		{/if}
	</div>
{:else}
	<div class="chat chat-start">
		<div class="chat-header" id={message._id}>
			{$membersStore[message.senderId]['username']}
			<time class="text-xs opacity-50">{since(message.createdAt)}</time>
		</div>
		<div class="chat-bubble">{message.body}</div>
		<!-- <div class="opacity-50 chat-footer">Seen</div> -->
	</div>
{/if}
