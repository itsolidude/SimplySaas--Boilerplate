<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Navbar } from '$lib/components/ui/navbar';
	import { Footer } from '$lib/components/ui/footer';
	import { AUTH_PATHS } from '$lib/features/auth/config/auth';
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />

	<main class="flex-1 flex flex-col items-center justify-center bg-background p-4">
		<div class="max-w-md w-full space-y-8 rounded-lg bg-card p-8 card-hover">
			<div class="text-center">
				<h1 class="text-4xl font-bold tracking-tight gradient-text">SvelteKit Boilerplate</h1>
				<p class="mt-4 text-lg text-muted-foreground">
					Modern SvelteKit starter with Supabase auth, shadcn, and TypeScript
				</p>
			</div>

			<div class="mt-8 flex justify-center">
				<Button href={AUTH_PATHS.LOGIN} size="lg">Get Started</Button>
			</div>
		</div>
	</main>

	<Footer />
</div>
