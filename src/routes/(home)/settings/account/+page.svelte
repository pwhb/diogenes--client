<script>
	import Input from '$lib/components/common/Input.svelte';
	import Modal from '$lib/components/common/Modal.svelte';
	import Wrapper from '$lib/components/layout/Wrapper.svelte';
	import ChangeUsername from '$lib/components/modals/ChangeUsername.svelte';
	import { CHANGE_USERNAME } from '$lib/consts/modals';
	import { openModal } from '$lib/modal';
	import Icon from '@iconify/svelte';

	function onChangeUsername() {
		openModal(CHANGE_USERNAME);
	}
</script>

<ChangeUsername />

<Wrapper title="Account Settings">
	<ul class="w-full menu bg-base-200 rounded-box">
		<li>
			<button on:click={onChangeUsername}>
				<Icon icon="solar:user-id-outline" width={24} />Change username</button
			>
		</li>
		<li>
			<button>
				<Icon icon="solar:lock-password-outline" width={24} />
				Change password</button
			>
		</li>
		<div class="my-0 divider" />
		<li>
			<button>
				<Icon icon="mingcute:user-remove-2-line" width={24} />
				Deactivate Account</button
			>
		</li>
	</ul>
</Wrapper>
