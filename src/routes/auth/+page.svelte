<script lang="ts">
	import { page } from '$app/state';
	import Login from '$lib/components/auth/Login.svelte';
	import Register from '$lib/components/auth/Register.svelte';
	import { SuccessMessage } from '$lib/components/ui/success-message';

	let { data } = $props();

	let isLogin = $state(true);

	const mode = $derived(page.url.searchParams.get('mode'));
	const message = $derived(page.url.searchParams.get('message'));
	$effect(() => {
		isLogin = mode !== 'register';
	});
</script>

<div class="min-h-[50vh]">
	{#if isLogin}
		<Login {data} successMessage={message} />
	{:else}
		<Register {data} />
	{/if}
</div>
