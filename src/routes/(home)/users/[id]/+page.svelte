<script>
	import { page } from '$app/stores';
	import Avatar from '$lib/components/common/Avatar.svelte';
</script>

<div class="flex flex-col gap-3 items-center">
	<Avatar username={$page.data.user.username} avatar={$page.data.user.avatar} width={'12'} />
	<div class="p-5 rounded-lg shadow-lg bg-base-300">
		<p class="text-base-content">bio</p>
	</div>
</div>
