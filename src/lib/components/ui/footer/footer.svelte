<script lang="ts">
	import { Logo } from '$lib/components/ui/logo';

	const currentYear = $state(new Date().getFullYear());

	const footerLinks = [
		{ href: '#', label: 'Terms' },
		{ href: '#', label: 'Privacy' },
		{ href: '#', label: 'Contact' }
	] as const;
</script>

<footer class="w-full border-t py-6 md:py-0">
	<div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
		<Logo size="sm" />

		<p class="text-sm text-muted-foreground">© {currentYear} JobHunt. All rights reserved.</p>

		<nav class="flex gap-4 sm:gap-6">
			{#each footerLinks as link}
				<a
					href={link.href}
					class="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</div>
</footer>
