<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
	let showPassword = false;
</script>

<div class="flex h-screen">
	<div class="m-auto">
		<form class="text-center" method="POST">
			<img
				src="https://diogenes-bun.onrender.com/api/v1/uploads/6525962d924620856dc035c3"
				class="mx-auto w-12 rotate-[60deg]"
				alt="diogenes"
			/>

			<h2 class="my-3 text-xl font-semibold">Welcome Back!</h2>

			<div class="form-control">
				<label class="label" for="username">
					<span class="label-text">Username</span>
				</label>
				<input
					name="username"
					type="username"
					placeholder="username"
					class="input input-bordered"
					required
				/>
			</div>
			<div class="form-control">
				<label class="label" for="password">
					<span class="label-text">Password</span>
				</label>
				<input
					name="password"
					type={showPassword ? 'text' : 'password'}
					placeholder="password"
					class="input input-bordered"
					required
				/>
			</div>
			<div class="form-control">
				<label class="cursor-pointer label">
					<span class="label-text">Show Password</span>
					<input type="checkbox" class="toggle" bind:checked={showPassword} />
				</label>
			</div>
			{#if form && form.message}
				<div class="my-2">
					<p class="text-red-500">{form.message}</p>
				</div>
			{/if}
			<div class="mt-6 form-control">
				<button class="btn btn-primary">Login</button>
			</div>
		</form>
	</div>
</div>
