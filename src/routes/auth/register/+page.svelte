<script lang="ts">
	import type { PageData } from './$types.js';
	import Register from '$lib/components/auth/Register.svelte';
	let { data }: { data: PageData } = $props();
</script>

<Register {data} />
