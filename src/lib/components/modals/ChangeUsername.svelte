<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { updateSelf } from '$lib/api/common';
	import { Collections } from '$lib/consts/db';
	import { CHANGE_USERNAME } from '$lib/consts/modals';
	import { Colors } from '$lib/consts/tailwind';
	import { closeModal } from '$lib/helpers/modal';
	import { modalMessage } from '$lib/stores/modal';
	import { toast } from '$lib/stores/toast';
	import Input from '../common/Input.svelte';
	import Modal from '../common/Modal.svelte';
	let isLoading = false;
	let username = $page.data.user.username;

	async function onSubmit() {
		modalMessage.set('');
		isLoading = true;
		const data = await updateSelf(Collections.users, $page.data.token, 'update', {
			username: username
		});
		isLoading = false;
		
		if (data.error && data.error.code === 11000) {
			modalMessage.set('Username is already taken.');
		} else {
			await invalidateAll();
			closeModal(CHANGE_USERNAME);
			toast('Username updated successfully.', 1200, Colors.success);
		}
	}
</script>

<Modal title="choose your username" modal_id={CHANGE_USERNAME} {onSubmit}>
	<form class="text-center">
		<Input name="username" label="username" bind:value={username} required disabled={isLoading} />
		{#if $modalMessage}
			<p class="text-red-500">{$modalMessage}</p>
		{/if}
	</form>
</Modal>
