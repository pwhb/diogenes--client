<script lang="ts">
	import { showToastStore, toastTextStore, toastTypeStore } from '$lib/services/stores/toast';
</script>

{#if $showToastStore}
	<div class="toast toast-center">
		<div class={`alert alermodalMessageTypeStoret-${$toastTypeStore}`}>
			<span>{$toastTextStore}</span>
		</div>
	</div>
{/if}
