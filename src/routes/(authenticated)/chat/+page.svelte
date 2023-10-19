<script lang="ts">
	import { page } from '$app/stores';
	import Avatar from "$lib/components/common/Avatar.svelte";
	import Wrapper from '$lib/components/layout/Wrapper.svelte';
</script>

<Wrapper title="Chat">
	<ul class="w-full menu bg-base-200 rounded-box">
		{#if $page.data.rooms.length}
			{#each $page.data.rooms as room}
				<li>
					<a href={`/chat/${room._id}`}>
						{#if room.type === 'friendship'}
							<Avatar
								avatar={room.members[0].avatar}
								username={room.members[0].username}
								width={'12'}
							/>
							<span class="font-bold">
								{room.members[0].username}
							</span>
						{/if}
					</a>
				</li>
			{/each}
		{:else}
			<p>You don't have any friend yet.</p>
		{/if}
	</ul>
</Wrapper>
