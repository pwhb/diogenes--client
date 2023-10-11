<script>
	import Wrapper from '$lib/components/layout/Wrapper.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import Icon from '@iconify/svelte';
	import { browser } from '$app/environment';
	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	// let theme;
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});

	const themes = ['light', 'dark', 'cupcake', 'pastel', 'autumn'];
	let theme = '';

	if (browser) {
		theme = localStorage.getItem('theme') || 'light';
	}
</script>

<Wrapper title="Themes">
	<ul class="w-full menu bg-base-200 rounded-box">
		{#each themes as value}
			<li>
				<button
					data-set-theme={value}
					on:click={() => {
						theme = value;
					}}
					data-act-class="ACTIVECLASS"
					class={theme === value ? 'capitalize text-primary font-bold' : 'capitalize'}
					>{value}
					{#if theme === value}
						<Icon icon="typcn:tick" width={16} />
					{/if}
				</button>
			</li>
		{/each}
	</ul>
</Wrapper>
