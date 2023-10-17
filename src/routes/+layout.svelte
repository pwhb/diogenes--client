<script>
	import Modal from '$lib/components/common/Modal.svelte';
	import Toast from '$lib/components/common/Toast.svelte';
	import AppBar from '$lib/components/layout/AppBar.svelte';
	import BottomNavigation from '$lib/components/layout/BottomNavigation.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<Modal />
<div class="mx-auto max-w-xl h-screen">
	<AppBar />
	<slot />
	<BottomNavigation />
</div>
<Toast />
