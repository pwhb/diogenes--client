<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { updateSelf } from '$lib/api/common';
	import { Collections } from '$lib/consts/db';
	import { ModalName } from '$lib/consts/modals';
	import { Colors } from '$lib/consts/tailwind';
	import { closeModal } from '$lib/helpers/modal';
	import { modalMessage } from '$lib/stores/modal';
	import { toast } from '$lib/stores/toast';
	import Modal from '../common/Modal.svelte';

	let isLoading = false;
	let wallpaper = $page.data.user.wallpaper;

	let selected: number | null = null;

	async function onSubmit() {
		modalMessage.set('');
		isLoading = true;
		const data = await updateSelf(Collections.users, $page.data.token, 'update', {
			wallpaper: wallpaper
		});
		isLoading = false;

		if (data.error && data.error.code === 11000) {
			modalMessage.set('Username is already taken.');
		} else {
			await invalidateAll();
			closeModal(ModalName.change_wallpaper);
			toast('Wallpaper updated successfully.', 1200, Colors.success);
		}
	}
</script>

<Modal
	title="Change your wallpaper"
	modal_id={ModalName.change_wallpaper}
	{onSubmit}
	okToSubmit={wallpaper && wallpaper !== $page.data.user.wallpaper}
>
	<div class="grid grid-cols-2 gap-5">
		{#each $page.data.wallpapers as { path, name }, idx}
			<!-- <img src={`${PUBLIC_BACKEND_URL}${path}`} alt={name} class="rounded-full bg-base-300" /> -->

			<button
				class={selected === idx
					? 'bg-neutral-100 h-48 object-contain'
					: 'bg-neutral-500 h-48 object-contain'}
				on:click={() => {
					selected = idx;
					wallpaper = path;
				}}
			>
				<img src={path} alt={name} />
			</button>
		{/each}
	</div>
	<form class="text-center">
		{#if $modalMessage}
			<p class="text-red-500">{$modalMessage}</p>
		{/if}
	</form>
</Modal>
