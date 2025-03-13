<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Sheet, SheetContent, SheetTrigger } from '$lib/components/ui/sheet';
	import { AUTH_PATHS } from '$lib/features/auth/config/auth';
	import { Logo } from '$lib/components/ui/logo';
	import IconBars3 from '~icons/heroicons/bars-3';

	let isOpen = $state(false);

	const navLinks = [
		{ href: '/private/dashboard', label: 'link 1' },
		{ href: '/private/dashboard', label: 'link 2' }
	];
</script>

<header
	class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-16 items-center justify-between">
		<Logo />

		<nav class="hidden md:flex items-center space-x-8">
			{#each navLinks as link}
				<a
					href={link.href}
					class="text-sm font-medium text-foreground/70 transition-colors hover:text-primary relative group"
					aria-current={$page.url.pathname === link.href ? 'page' : undefined}
				>
					{link.label}
					<span
						class="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"
					></span>
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-4">
			<a href={AUTH_PATHS.LOGIN} class="hidden sm:block">
				<Button variant="ghost" class="text-foreground/70 hover:text-primary hover:bg-primary/10">
					Log in
				</Button>
			</a>
			<a href={AUTH_PATHS.REGISTER}>
				<Button class="shadow-sm transition-all hover:shadow-md">Sign up</Button>
			</a>

			<Sheet bind:open={isOpen}>
				<SheetTrigger
					class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 md:hidden"
				>
					<IconBars3 class="h-5 w-5" />
					<span class="sr-only">Toggle menu</span>
				</SheetTrigger>
				<SheetContent side="right" class="w-[300px] sm:w-[400px]">
					<div class="flex flex-col h-full py-6">
						<div class="flex items-center justify-between mb-8">
							<Logo />
						</div>

						<nav class="flex flex-col space-y-6">
							{#each navLinks as link}
								<a
									href={link.href}
									class="text-lg font-medium text-foreground/70 transition-colors hover:text-primary"
									aria-current={$page.url.pathname === link.href ? 'page' : undefined}
									onclick={() => (isOpen = false)}
								>
									{link.label}
								</a>
							{/each}
						</nav>

						<div class="mt-auto space-y-4">
							<a href={AUTH_PATHS.LOGIN} onclick={() => (isOpen = false)}>
								<Button variant="outline" class="w-full">Log in</Button>
							</a>
							<a href={AUTH_PATHS.REGISTER} onclick={() => (isOpen = false)}>
								<Button class="w-full">Sign up</Button>
							</a>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	</div>
</header>
