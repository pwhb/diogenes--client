<script lang="ts">
	export let name = '';
	export let label = 'label';
	export let checked = false;
	export let required = true;
	export let disabled = false;
</script>

<div class="w-full max-w-xs form-control">
	<label class="cursor-pointer label" for={name}>
		<span class="capitalize label-text">{label}</span>
		<input
			{name}
			type="checkbox"
			placeholder={label}
			class="toggle"
			bind:checked
			{required}
			{disabled}
		/>
	</label>
</div>
