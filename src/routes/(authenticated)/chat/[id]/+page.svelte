<script>
	import BottomBar from '$lib/components/layout/BottomBar.svelte';
	import ChatAppBar from '$lib/components/layout/ChatAppBar.svelte';
	import ChatBody from '$lib/components/layout/ChatBody.svelte';
</script>

<div class="flex flex-col mx-auto max-w-xl h-screen">
	<ChatAppBar />

	<ChatBody />

	<BottomBar />
</div>
