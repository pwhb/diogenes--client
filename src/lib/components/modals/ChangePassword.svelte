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
	import Input from '../common/Input.svelte';
	import Modal from '../common/Modal.svelte';
	import PasswordInput from '../common/PasswordInput.svelte';
	import Toggle from '../common/Toggle.svelte';
	let isLoading = false;
	let password = '';
	let newPassword = '';
	let showPassword = false;

	async function onSubmit() {
		modalMessageStore.set('');
		isLoading = true;
		const data = await updateSelf(Collections.users, $page.data.token, 'changePassword', {
			password: password,
			newPassword: newPassword
		});
		if (data.message) {
			modalMessageStore.set(data.message);
		}
		isLoading = false;
		if (data.data) {
			await invalidateAll();
			closeModal(ModalName.change_password);
			toast('Password updated successfully.', 1200, Colors.success);
		}
	}
</script>

<Modal title="choose your new password" modal_id={ModalName.change_password} {onSubmit}>
	<form class="text-center">
		{#if showPassword}
			<Input name="password" label="password" bind:value={password} required disabled={isLoading} />
			<Input
				name="newPassword"
				label="New password"
				bind:value={newPassword}
				required
				disabled={isLoading}
			/>
		{:else}
			<PasswordInput
				name="password"
				label="password"
				bind:value={password}
				required
				disabled={isLoading}
			/>
			<PasswordInput
				name="newPassword"
				label="New password"
				bind:value={newPassword}
				required
				disabled={isLoading}
			/>
		{/if}
		<Toggle label="Show Password" bind:checked={showPassword} />
		{#if $modalMessageStore}
			<p class="text-red-500">{$modalMessageStore}</p>
		{/if}
	</form>
</Modal>
