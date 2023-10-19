<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { updateSelf } from '$lib/services/api/common';
	import { Collections } from '$lib/consts/db';
	import { ModalName } from '$lib/consts/modals';
	import { Colors } from '$lib/consts/tailwind';
	import { closeModal } from '$lib/helpers/modal';
	import { modalMessageStore } from '$lib/services/stores/modal';
	import { toast } from '$lib/services/stores/toast';
	import { onMount } from 'svelte';
	import Input from '../common/Input.svelte';
	import Modal from '../common/Modal.svelte';
	let isLoading = false;
	let username = $page.data.user.username;

	async function onSubmit() {
		modalMessageStore.set('');
		isLoading = true;
		const data = await updateSelf(Collections.users, $page.data.token, 'update', {
			username: username
		});
		isLoading = false;

		if (data.error && data.error.code === 11000) {
			modalMessageStore.set('Username is already taken.');
		} else {
			await invalidateAll();
			closeModal(ModalName.change_username);
			toast('Username updated successfully.', 1200, Colors.success);
		}
	}
</script>

<Modal
	title="choose your username"
	modal_id={ModalName.change_username}
	{onSubmit}
	okToSubmit={username && username !== $page.data.user.username}
>
	<form class="text-center">
		<Input name="username" label="username" bind:value={username} required disabled={isLoading} />
		{#if $modalMessageStore}
			<p class="text-red-500">{$modalMessageStore}</p>
		{/if}
	</form>
</Modal>
