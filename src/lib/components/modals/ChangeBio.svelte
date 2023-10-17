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
	import Input from '../common/Input.svelte';
	import Modal from '../common/Modal.svelte';
	let isLoading = false;
	let bio = $page.data.user.bio;

	async function onSubmit() {
		modalMessage.set('');
		isLoading = true;
		const data = await updateSelf(Collections.users, $page.data.token, 'update', {
			bio: bio
		});
		isLoading = false;

		if (data.error && data.error.code === 11000) {
			modalMessage.set('Username is already taken.');
		} else {
			await invalidateAll();
			closeModal(ModalName.change_bio);
			toast('Bio updated successfully.', 1200, Colors.success);
		}
	}
</script>

<Modal
	title="Change your bio"
	modal_id={ModalName.change_bio}
	{onSubmit}
	okToSubmit={bio && bio !== $page.data.user.bio}
>
	<form class="text-center">
		<Input name="bio" label="bio" bind:value={bio} required disabled={isLoading} />
		{#if $modalMessage}
			<p class="text-red-500">{$modalMessage}</p>
		{/if}
	</form>
</Modal>
