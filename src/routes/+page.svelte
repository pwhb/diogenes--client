<script lang="ts">
	import { PUBLIC_BACKEND_URL, PUBLIC_WS_URL } from '$env/static/public';
	import WsKeys from '$lib/consts/WsKeys';
	import { onMount } from 'svelte';
	let username = '';
	let password = '';

	let roomId = '';
	let text = '';
	let ws: WebSocket;
	let token = '';
	// const token =
	// 	'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im53aCIsImV4cCI6MTY5NzAxNTI2Nn0.jPuwO1KmzbfYv0Pi-rTt8c9fOMiuUovXS603OWNOAW0';

	function connectWS(roomId: string) {
		ws = new WebSocket(`${PUBLIC_WS_URL}?token=${token}`);
		ws.addEventListener('open', (e) => {
			console.log('open', e);
			ws.send(
				JSON.stringify({
					type: WsKeys.join,
					rooms: [roomId]
				})
			);
		});

		ws.addEventListener('close', (e) => {
			console.log('close', e);
		});

		ws.addEventListener('message', (e) => {
			console.log('message', e);
		});

		ws.addEventListener('error', (e) => {
			console.log('error', e);
		});
	}

	function handleSubmit(e: any) {
		if (ws) {
			e.preventDefault();
			console.log('submit', text);
			ws.send(
				JSON.stringify({
					type: WsKeys.message,
					roomId: roomId,
					body: text
				})
			);
			text = '';
		}
	}

	async function handleLogin(e: any) {
		const url = `${PUBLIC_BACKEND_URL}/auth/login`;
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
		const data = await res.json();
		console.log(data.data);

		if (data.data.token) {
			token = data.data.token;
			connectWS(roomId);
		}
	}
</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>
{#if token}
	<p>{token}</p>
	<form on:submit={handleSubmit}>
		<input
			type="text"
			placeholder="Type here"
			class="w-full max-w-xs input input-bordered"
			bind:value={text}
		/>
		<button class="btn" type="submit">Send</button>
	</form>
{:else}
	<form on:submit={handleLogin}>
		<input
			type="text"
			placeholder="Room ID"
			class="w-full max-w-xs input input-bordered"
			bind:value={roomId}
		/>
		<input
			type="text"
			placeholder="username"
			bind:value={username}
			class="w-full max-w-xs input input-bordered"
		/>
		<input
			type="password"
			placeholder="password"
			bind:value={password}
			class="w-full max-w-xs input input-bordered"
		/>
		<button class="btn" type="submit">login</button>
	</form>
{/if}
