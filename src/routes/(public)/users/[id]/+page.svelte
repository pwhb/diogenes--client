<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { createOne, deleteOne } from '$lib/api/common';
	import Avatar from '$lib/components/common/Avatar.svelte';
	import ChangeAvatar from '$lib/components/modals/ChangeAvatar.svelte';
	import ChangeBio from '$lib/components/modals/ChangeBio.svelte';
	import ChangeUsername from '$lib/components/modals/ChangeUsername.svelte';
	import ChangeWallpaper from '$lib/components/modals/ChangeWallpaper.svelte';
	import { Collections } from '$lib/consts/db';
	import { ModalName } from '$lib/consts/modals';
	import { Colors } from '$lib/consts/tailwind';
	import { openModal } from '$lib/helpers/modal';
	import { toast } from '$lib/stores/toast';
	import Icon from '@iconify/svelte';

	function onChangeWallpaper() {
		openModal(ModalName.change_wallpaper);
	}

	function onChangeAvatar() {
		openModal(ModalName.change_avatar);
	}

	function onChangeUsername() {
		openModal(ModalName.change_username);
	}

	function onChangeBio() {
		openModal(ModalName.change_bio);
	}

	async function onFollow() {
		const data = await createOne(Collections.followings, $page.data.token, {
			followed: $page.data.data._id
		});
		invalidateAll();
	}

	async function onUnfollow() {
		const data = await createOne(`${Collections.followings}/unfollow`, $page.data.token, {
			followed: $page.data.data._id
		});
		invalidateAll();
	}

	function copyUrl() {
		navigator.clipboard.writeText($page.url.toString());
		toast('URL copied to the clipboard', 1200, Colors.success);
	}

	const isAFollower = (followers: any[]) =>
		followers.some((doc) => doc.follower === $page.data.user._id);
</script>

<ChangeAvatar />
<ChangeWallpaper />
<ChangeUsername />
<ChangeBio />
<div class="w-full h-64 -z-12">
	<img
		src={$page.data.user.wallpaper || '/bg/undraw_stars_re_6je7.svg'}
		alt="cover"
		class="w-full h-64"
	/>
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
		<p>
			{$page.data.followings.total} following{$page.data.followings.total > 1 ? 's' : ''} | {$page
				.data.followers.total} follower{$page.data.followers.total > 1 ? 's' : ''}
		</p>
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
				{#if $page.data.followers.total && isAFollower($page.data.followers.data)}
					<button class="btn btn-error btn-xs join-item" on:click={onUnfollow}>Unfollow</button>
				{:else}
					<button class="btn btn-primary btn-xs join-item" on:click={onFollow}>Follow</button>
				{/if}
				<button class="btn btn-secondary btn-xs join-item" on:click={copyUrl}>Share</button>
			</div>
		{:else}
			<button class="btn btn-secondary btn-xs join-item" on:click={copyUrl}>Share</button>
		{/if}
	</div>
</div>
