<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { ProfileDropdown } from '$lib/components/ui/profile-dropdown';
	import { AUTH_PATHS, AUTH_REDIRECT_PATHS } from '$lib/features/auth/config/auth';

	interface LayoutData {
		supabase: any;
		user: { email: string } | null;
	}

	let { data, children } = $props<{ data: LayoutData; children: any }>();
	let { supabase, user } = $derived(data);

	async function handleSignOut() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error signing out:', error.message);
		} else {
			// Redirect to homepage after successful signout
			goto(AUTH_REDIRECT_PATHS.SUCCESS.LOGOUT, { invalidateAll: true });
		}
	}
</script>

<div class="min-h-screen bg-gray-50">
	<header class="bg-white shadow-sm">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16 items-center">
				<nav class="flex space-x-4">
					<a
						href="/private"
						class="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium {$page
							.url.pathname === '/private'
							? 'text-indigo-600'
							: ''}"
					>
						Dashboard
					</a>
				</nav>

				<div class="flex items-center">
					{#if user}
						<ProfileDropdown
							name={user.email.split('@')[0]}
							email={user.email}
							onSignOut={handleSignOut}
						/>
					{/if}
				</div>
			</div>
		</div>
	</header>

	<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
		{@render children()}
	</main>
</div>
