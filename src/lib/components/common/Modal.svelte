<script lang="ts">
	import { MODAL_ID, closeModal } from '$lib/helpers/modal';
	export let modal_id = MODAL_ID;
	export let title = 'Hello!';
	export let okToSubmit = false;

	export let onSubmit = () => {
		closeModal(modal_id);
	};
</script>

<!-- Open the modal using ID.showModal() method -->

<!-- <button class="btn" on:click={'my_modal_1.showModal()'}>open modal</button> -->
<dialog id={modal_id} class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold capitalize">{title}</h3>
		<slot />
		<div class="modal-action">
			<button
				class={okToSubmit ? 'btn btn-primary' : 'btn btn-primary btn-disabled'}
				on:click={onSubmit}
				disabled={!okToSubmit}>OK</button
			>
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Cancel</button>
			</form>
		</div>
	</div>
</dialog>
