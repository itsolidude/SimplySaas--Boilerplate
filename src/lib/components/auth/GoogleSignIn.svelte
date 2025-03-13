<script lang="ts">
	import { page } from '$app/stores';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { Spinner } from '$lib/components/ui/spinner';
	import { OAUTH_CONFIG } from '$lib/features/auth/config/auth';

	const supabase = $derived($page.data.supabase as SupabaseClient);
	let loading = $state(false);

	async function signInWithGoogle() {
		loading = true;
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: OAUTH_CONFIG.PROVIDER_OPTIONS.GOOGLE.queryParams,
				redirectTo: `${window.location.origin}${OAUTH_CONFIG.REDIRECT_PATH}`
			}
		});

		if (error) {
			console.error('Error signing in with Google:', error.message);
			loading = false;
		}
	}
</script>

<button type="button" class="social-auth-btn" onclick={signInWithGoogle} disabled={loading}>
	{#if loading}
		<Spinner />
		<span>Connecting to Google...</span>
	{:else}
		<img src="https://authjs.dev/img/providers/google.svg" alt="Google logo" class="w-5 h-5" />
		Sign in with Google
	{/if}
</button>
