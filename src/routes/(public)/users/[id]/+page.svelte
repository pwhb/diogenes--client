<script>
	import { page } from '$app/stores';
	import Avatar from '$lib/components/common/Avatar.svelte';
	import Modal from '$lib/components/common/Modal.svelte';
	import ChangeBio from '$lib/components/modals/ChangeBio.svelte';
	import ChangeUserInfo from '$lib/components/modals/ChangeBio.svelte';
	import ChangeUsername from '$lib/components/modals/ChangeUsername.svelte';
	import { ModalName } from '$lib/consts/modals';
	import { Colors } from '$lib/consts/tailwind';
	import { openModal } from '$lib/helpers/modal';
	import { toast } from '$lib/stores/toast';
	import Icon from '@iconify/svelte';
	const bg = 'https://diogenes-pwhb.koyeb.app/api/v1/uploads/652253d41ead448aa0ed0cc0';

	function onChangeWallpaper() {
		console.log('changeWallpaper');
	}

	function onChangeAvatar() {
		console.log('changeAvatar');
	}

	function onChangeUsername() {
		openModal(ModalName.change_username);
	}

	function onChangeBio() {
		openModal(ModalName.change_bio);
	}

	function onFollow() {}

	function copyUrl() {
		navigator.clipboard.writeText($page.url.toString());
		toast('URL copied to the clipboard', 1200, Colors.success);
	}
</script>

<ChangeUsername />
<ChangeBio />
<div class="w-full h-64 -z-12">
	<img src={bg} alt="cover" class="object-none w-full h-64" />
	{#if $page.data.user && $page.data.user._id === $page.data.data._id}
		<div class="relative">
			<button
				class="absolute -top-3 right-3 z-10 btn-xs btn btn-circle btn-secondary text-base-100"
				on:click={onChangeWallpaper}><Icon icon="typcn:plus" width={16} class="" /></button
			>
		</div>
	{/if}
</div>

<div class="relative bottom-20">
	<div class="flex flex-col gap-3 items-center p-5">
		<div class="relative z-10 mt-5">
			<Avatar username={$page.data.data.username} avatar={$page.data.data.avatar} width={'20'} />
			{#if $page.data.user && $page.data.user._id === $page.data.data._id}
				<button
					class="absolute top-14 left-14 btn-xs btn btn-circle btn-secondary text-base-100"
					on:click={onChangeAvatar}><Icon icon="typcn:plus" width={16} class="" /></button
				>
			{/if}
		</div>
		<p class="relative font-bold">
			@{$page.data.data.username}
			{#if $page.data.user && $page.data.user._id === $page.data.data._id}
				<button class="relative top-1" on:click={onChangeUsername}
					><Icon icon="solar:pen-new-square-outline" /></button
				>
			{/if}
		</p>
		<p>0 followings | 0 followers</p>
		{#if $page.data.user && $page.data.user._id === $page.data.data._id}
			<button class="p-5 w-2/3 text-center rounded-xl shadow-lg bg-base-200" on:click={onChangeBio}>
				<p class="text-base-content">{$page.data.data.bio || '...'}</p>
			</button>
		{:else}
			<div class="p-5 w-2/3 text-center rounded-xl shadow-lg bg-base-200">
				<p class="text-base-content">{$page.data.data.bio || '...'}</p>
			</div>
		{/if}

		{#if $page.data.user && $page.data.user._id !== $page.data.data._id}
			<div class="join">
				<button class="btn btn-primary btn-xs join-item" on:click={onFollow}>Follow</button>
				<button class="btn btn-secondary btn-xs join-item" on:click={copyUrl}>Share</button>
			</div>
		{:else}
			<button class="btn btn-secondary btn-xs join-item" on:click={copyUrl}>Share</button>
		{/if}
	</div>
</div>
