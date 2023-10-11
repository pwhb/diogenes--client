<script lang="ts">
	export let name = '';
	export let label = 'label';
	export let value = '';
	export let required = true;
	export let disabled = false;
</script>

<div class="w-full max-w-xs form-control">
	<label class="label" for={name}>
		<span class="capitalize label-text">{label}</span>
	</label>
	<input
		{name}
		type="text"
		placeholder={label}
		class="w-full max-w-xs input input-bordered"
		bind:value
		{required}
		{disabled}
	/>
</div>
