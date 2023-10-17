<script lang="ts">
	import { page } from '$app/stores';
	import { getMany } from '$lib/api/common';
	import Avatar from '$lib/components/common/Avatar.svelte';
	import Search from '$lib/components/common/Search.svelte';
	import Wrapper from '$lib/components/layout/Wrapper.svelte';
	import { Collections } from '$lib/consts/db';

	let searchResults: any[] = [];
	let search = '';
	let isLoading = false;
	async function onSearch() {
		if (search) {
			isLoading = true;
			const data = await getMany(Collections.users, `?active=true&search=${search}`);
			searchResults = data.data;
			isLoading = false;
		} else {
			searchResults = [];
		}
	}
</script>

<Wrapper title="Find Friends">
	<form class="text-center" on:submit={onSearch}>
		<Search bind:search {isLoading} {onSearch} />
	</form>
	{#if searchResults.length}
		<ul class="w-full menu bg-base-200 rounded-box">
			{#each searchResults as user}
				<li>
					<a href={`/users/${user._id}`}>
						<Avatar avatar={user.avatar} username={user.username} width={'12'} />
						<span class="font-bold">
							{user.username}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</Wrapper>
