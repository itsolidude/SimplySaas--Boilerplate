<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import IconMail from '~icons/heroicons/envelope-solid';
	import IconCheck from '~icons/heroicons/check-circle-solid';
	import { enhance } from '$app/forms';
	import { AUTH_PATHS } from '$lib/features/auth/config/auth';

	let { data } = $props();
	let { email } = $derived(data);
	let currentEmail = $state('');

	$effect(() => {
		if (typeof window !== 'undefined') {
			// First try to get email from URL
			const urlParams = new URL(window.location.href).searchParams;
			const urlEmail = urlParams.get('email');

			if (urlEmail) {
				currentEmail = urlEmail;
				return;
			}
		}

		// If no URL email, use email from data
		if (email) {
			currentEmail = email;
		}
	});

	let resending = $state(false);
	let resendSuccess = $state(false);
	let resendError = $state('');

	function getEmailProviderInfo(email: string) {
		const domain = email.split('@')[1]?.toLowerCase();

		if (!domain) return { name: 'Email', url: '' };

		// Check if domain contains any of these provider strings
		if (domain.includes('gmail')) {
			return { name: 'Gmail', url: 'https://mail.google.com' };
		}

		if (
			domain.includes('outlook') ||
			domain.includes('hotmail') ||
			domain.includes('live') ||
			domain.includes('msn')
		) {
			return { name: 'Outlook', url: 'https://outlook.live.com' };
		}

		if (domain.includes('yahoo')) {
			return { name: 'Yahoo Mail', url: 'https://mail.yahoo.com' };
		}

		if (domain.includes('icloud') || domain.includes('me.com') || domain.includes('mac.com')) {
			return { name: 'iCloud Mail', url: 'https://www.icloud.com/mail' };
		}

		if (domain.includes('aol')) {
			return { name: 'AOL Mail', url: 'https://mail.aol.com' };
		}

		if (domain.includes('proton') || domain.includes('protonmail')) {
			return { name: 'ProtonMail', url: 'https://mail.proton.me' };
		}

		return { name: 'Email', url: '' };
	}

	function openEmailProvider() {
		const { url } = getEmailProviderInfo(currentEmail);
		if (url) {
			window.open(url, '_blank');
		}
	}

	const handleSubmit = () => {
		resending = true;
		resendError = '';

		return async ({ result }: { result: { type: string; data?: Record<string, any> } }) => {
			resending = false;

			if (result.type === 'failure') {
				const data = result.data as { message?: string };
				resendError = data?.message || 'Failed to resend verification email';
				return;
			}

			if (result.type === 'success') {
				resendSuccess = true;
				resendError = '';
				setTimeout(() => {
					resendSuccess = false;
				}, 5000);
			}
		};
	};
</script>

<div class="flex min-h-screen flex-col bg-background">
	<div class="flex min-h-screen flex-col items-center justify-center px-4 py-12">
		<div class="mx-auto w-full max-w-md space-y-6">
			<div class="space-y-6 bg-card p-8 rounded-xl border card-hover">
				<div class="flex flex-col items-center space-y-6 text-center">
					<!-- Email icon with notification dot -->
					<div class="relative inline-block">
						<div class="p-6 rounded-[--radius] bg-muted">
							<IconMail class="h-12 w-12 text-muted-foreground" />
						</div>
						<div
							class="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-primary border-2 border-background"
						></div>
					</div>

					<!-- Content -->
					<div class="space-y-6">
						<h1 class="text-2xl font-semibold text-foreground">Verify your email to continue</h1>

						<!-- Message -->
						<div class="text-muted-foreground space-y-2">
							<p>We've just sent you an email!</p>
							{#if currentEmail}
								<p class="font-medium text-foreground">{currentEmail}</p>
							{/if}
							<p>Please check your email and select the link provided to verify your address.</p>
						</div>

						<!-- Action Buttons -->
						<div class="flex flex-col sm:flex-row gap-3 justify-center pt-4">
							<Button variant="default" onclick={() => goto(AUTH_PATHS.LOGIN)}>Back to login</Button
							>
							{#if currentEmail}
								{@const provider = getEmailProviderInfo(currentEmail)}
								{#if provider.url}
									<Button onclick={openEmailProvider}>Open {provider.name}</Button>
								{/if}
							{/if}
						</div>

						<!-- Resend Section -->
						<div class="text-sm text-muted-foreground mt-8">
							<p>Didn't receive the email?</p>
							<div class="flex flex-col items-center gap-2">
								<form method="POST" action="?/resend" use:enhance={handleSubmit}>
									<input type="hidden" name="email" value={currentEmail} />
									<Button
										type="submit"
										variant="link"
										class="h-auto p-0 fade-in"
										disabled={resending}
									>
										{#if resending}
											<span class="flex items-center gap-2">
												<div
													class="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"
												></div>
												Sending...
											</span>
										{:else if resendSuccess}
											<span class="flex items-center gap-2 text-success">
												<IconCheck class="h-4 w-4" />
												Email sent successfully
											</span>
										{:else}
											<span class="text-primary hover:text-primary/80">
												Resend verification email
											</span>
										{/if}
									</Button>
								</form>

								{#if resendError}
									<p class="text-sm text-destructive mt-2">{resendError}</p>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
