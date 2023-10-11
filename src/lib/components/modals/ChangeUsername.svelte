<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { updateSelf } from '$lib/api/common';
	import { Collections } from '$lib/consts/db';
	import { CHANGE_USERNAME } from '$lib/consts/modals';
	import { Colors } from '$lib/consts/tailwind';
	import { closeModal } from '$lib/modal';
	import { toast } from '$lib/stores/toast';
	import Input from '../common/Input.svelte';
	import Modal from '../common/Modal.svelte';
	let isLoading = false;
	let username = $page.data.user.username;
	let errorMessage = '';
	async function onSubmit() {
		errorMessage = '';
		isLoading = true;
		const data = await updateSelf(Collections.users, $page.data.token, 'update', {
			username: username
		});
		if (data.error && data.error.code === 11000) {
			errorMessage = 'Username is already taken.';
		}
		isLoading = false;
		await invalidateAll();
		closeModal(CHANGE_USERNAME);
		toast('Username updated successfully.', 1200, Colors.success);
	}
</script>

<Modal title="Change username?" modal_id={CHANGE_USERNAME} {onSubmit}>
	<form class="text-center">
		<Input name="username" label="username" bind:value={username} required disabled={isLoading} />
		{#if errorMessage}
			<p class="text-red-500">{errorMessage}</p>
		{/if}
	</form>
</Modal>
