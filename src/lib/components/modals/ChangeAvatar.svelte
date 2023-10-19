<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { updateSelf } from '$lib/services/api/common';
	import { Collections } from '$lib/consts/db';
	import { ModalName } from '$lib/consts/modals';
	import { Colors } from '$lib/consts/tailwind';
	import { closeModal } from '$lib/helpers/modal';
	import { modalMessageStore } from '$lib/services/stores/modal';
	import { toast } from '$lib/services/stores/toast';
	import Modal from '../common/Modal.svelte';
	let isLoading = false;
	let avatar = $page.data.user.avatar;

	let selected: number | null = null;

	async function onSubmit() {
		modalMessageStore.set('');
		isLoading = true;
		const data = await updateSelf(Collections.users, $page.data.token, 'update', {
			avatar: avatar
		});
		isLoading = false;

		if (data.error && data.error.code === 11000) {
			modalMessageStore.set('Username is already taken.');
		} else {
			await invalidateAll();
			closeModal(ModalName.change_avatar);
			toast('Avatar updated successfully.', 1200, Colors.success);
		}
	}
</script>

<Modal
	title="Change your avatar"
	modal_id={ModalName.change_avatar}
	{onSubmit}
	okToSubmit={avatar && avatar !== $page.data.user.avatar}
>
	<div class="grid grid-cols-4 gap-5">
		{#each $page.data.avatars as { path, name }, idx}
			<!-- <img src={`${PUBLIC_BACKEND_URL}${path}`} alt={name} class="rounded-full bg-base-300" /> -->

			<button
				class="avatar"
				on:click={() => {
					selected = idx;
					avatar = path;
				}}
			>
				<div
					class={selected === idx ? 'rounded-full bg-neutral-100' : 'rounded-full bg-neutral-500'}
				>
					<img src={path} alt={name} />
				</div>
			</button>
		{/each}
	</div>
	<form class="text-center">
		{#if $modalMessageStore}
			<p class="text-red-500">{$modalMessageStore}</p>
		{/if}
	</form>
</Modal>
