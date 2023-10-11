<script lang="ts">
	export let title: string;
</script>

<div class="mx-3">
	<p class="mb-2 ml-3 text-xl font-bold">{title}</p>
	<slot />
</div>
