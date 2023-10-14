<script>
	import { page } from '$app/stores';
	import Avatar from '$lib/components/common/Avatar.svelte';
	import Icon from '@iconify/svelte';
	const bg = 'https://diogenes-bun.onrender.com/api/v1/uploads/652253d41ead448aa0ed0cc0';
</script>

<div class="w-full h-64 -z-12">
	<img src={bg} alt="cover" class="object-none w-full h-64" />
	<button class="relative left-[95%] bottom-[3%] btn-xs btn btn-circle btn-secondary text-base-100"
		><Icon icon="typcn:plus" width={16} class="" /></button
	>
</div>

<div class="relative bottom-20">
	<div class="flex flex-col gap-3 items-center p-5">
		<div class="relative left-3 z-10 mt-5">
			<Avatar username={$page.data.data.username} avatar={$page.data.data.avatar} width={'20'} />
			<button class="relative top-7 right-7 btn-xs btn btn-circle btn-secondary text-base-100"
				><Icon icon="typcn:plus" width={16} class="" /></button
			>
		</div>
		<p class="relative font-bold">
			@{$page.data.data.username}
			<button class="relative top-1"><Icon icon="solar:pen-new-square-outline" /></button>
		</p>
		<p>0 followings | 0 followers</p>
		<div class="p-5 w-2/3 text-center rounded-xl shadow-lg bg-base-200">
			<p class="text-base-content">{$page.data.data.bio || '...'}</p>
		</div>
	</div>
</div>
