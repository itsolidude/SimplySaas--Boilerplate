<script lang="ts">
	import type { PageData } from './$types.js';
	import Login from '$lib/components/auth/Login.svelte';
	let { data }: { data: PageData } = $props();
</script>

<Login {data} />
