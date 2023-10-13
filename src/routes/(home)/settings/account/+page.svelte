<script lang="ts">
	import Wrapper from '$lib/components/layout/Wrapper.svelte';
	import ChangePassword from '$lib/components/modals/ChangePassword.svelte';
	import ChangeUsername from '$lib/components/modals/ChangeUsername.svelte';
	import { CHANGE_PASSWORD, CHANGE_USERNAME } from '$lib/consts/modals';
	import { openModal } from '$lib/helpers/modal';
	import Icon from '@iconify/svelte';

	function onChangeUsername() {
		openModal(CHANGE_USERNAME);
	}

	function onChangePassword() {
		openModal(CHANGE_PASSWORD);
	}

	async function onDeactivateAccount() {
		const el = document.getElementById('logout-form') as any;
		el.submit();
	}
</script>

<ChangeUsername />

<ChangePassword />

<form action="/logout" method="POST" id="logout-form" />

<Wrapper title="Account Settings">
	<ul class="w-full menu bg-base-200 rounded-box">
		<li>
			<button on:click={onChangeUsername}>
				<Icon icon="solar:user-id-outline" width={24} />Change username</button
			>
		</li>
		<li>
			<button on:click={onChangePassword}>
				<Icon icon="solar:lock-password-outline" width={24} />
				Change password</button
			>
		</li>
		<div class="my-0 divider" />
		<li>
			<button on:click={onDeactivateAccount} disabled>
				<Icon icon="mingcute:user-remove-2-line" width={24} />
				Deactivate Account</button
			>
		</li>
	</ul>
</Wrapper>
