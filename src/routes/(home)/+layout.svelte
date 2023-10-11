<script>
	import Toast from '$lib/components/common/Toast.svelte';
	import AppBar from '$lib/components/layout/AppBar.svelte';
	import BottomNavigation from '$lib/components/layout/BottomNavigation.svelte';
</script>

<AppBar />
<slot />
<BottomNavigation />
<Toast />
