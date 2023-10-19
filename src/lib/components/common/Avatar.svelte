<script lang="ts">
	
	export let avatar: string | '';
	export let username: string;
	export let width = '8';
</script>

{#if avatar}
	<div class="avatar">
		<div class={`w-${width} rounded-full bg-neutral-50 p-2`}>
			<img src={avatar} alt={username} />
		</div>
	</div>
{:else}
	<div class="avatar placeholder">
		<div class={`w-${width} rounded-full bg-neutral-focus text-neutral-content`}>
			<span class="text-{parseInt(width) > 12 ? '2xl' : 'lg'} uppercase">{username[0]}</span>
		</div>
	</div>
{/if}
