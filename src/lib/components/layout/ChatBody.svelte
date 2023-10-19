<script>
	import { messageStore } from '$lib/services/stores/message';
	import Message from '../common/Message.svelte';
</script>

<div class="overflow-x-auto mb-2 scrollbar-hide grow">
	<div class="h-4/6" />
	{#each $messageStore as message, idx}
		<Message {message} last={idx === $messageStore.length - 1} />
	{/each}
</div>
