<script lang="ts">
	import { showToast, text, type } from '$lib/stores/toast';
</script>

{#if $showToast}
	<div class="toast toast-center">
		<div class={`alert alert-${$type}`}>
			<span>{$text}</span>
		</div>
	</div>
{/if}
