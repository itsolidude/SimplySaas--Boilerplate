<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import { Spinner } from '$lib/components/ui/spinner';
	import GoogleSignIn from './GoogleSignIn.svelte';
	import { ErrorMessage } from '$lib/components/ui/error-message';
	import { SuccessMessage } from '$lib/components/ui/success-message';
	import { Logo } from '$lib/components/ui/logo';

	let {
		title,
		description,
		form,
		formAction,
		formData,
		buttonText,
		submitting,
		message,
		successMessage = null,
		showForgotPassword = false,
		showPasswordToggle = false,
		footerText,
		footerLinkText,
		footerLinkHref,
		enhance
	} = $props<{
		title: string;
		description: string;
		form: any;
		formAction: string;
		formData: any;
		buttonText: string;
		submitting: boolean;
		message: string | null;
		successMessage?: string | null;
		showForgotPassword?: boolean;
		showPasswordToggle?: boolean;
		footerText: string;
		footerLinkText: string;
		footerLinkHref: string;
		enhance: (node: HTMLFormElement) => void;
	}>();

	let currentSuccessMessage = $state(successMessage);

	$effect(() => {
		if (message) {
			currentSuccessMessage = null;
		}
	});
</script>

<div class="flex min-h-screen flex-col bg-background">
	<div class="flex min-h-screen flex-col items-center justify-center px-4 py-12">
		<div class="mx-auto w-full max-w-md space-y-6">
			<div class="space-y-6 bg-card p-8 rounded-xl border card-hover">
				<div class="flex flex-col items-center space-y-2 text-center">
					<a href="/" class="block" data-sveltekit-preload-data>
						<Logo size="lg" />
					</a>
					<h1 class="text-3xl font-bold text-foreground">{title}</h1>
					<p class="text-muted-foreground" id="form-description">
						{description}
					</p>
				</div>

				<form
					method="POST"
					action={formAction}
					class="space-y-6"
					aria-describedby="form-description"
					use:enhance
				>
					<div class="space-y-3">
						<SuccessMessage message={currentSuccessMessage} />
						<ErrorMessage {message} />
					</div>

					<div class="space-y-2">
						<Form.Field {form} name="email">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Email</Form.Label>
									<Input
										{...props}
										type="email"
										placeholder="m@example.com"
										class="mt-1 w-full"
										disabled={submitting}
										bind:value={$formData.email}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors class="text-sm text-destructive mt-1" />
						</Form.Field>
					</div>

					<div class="space-y-2">
						<Form.Field {form} name="password">
							<Form.Control>
								{#snippet children({ props })}
									<div class="flex justify-between items-center">
										<Form.Label>Password</Form.Label>
										{#if showForgotPassword}
											<a href="/auth/reset" class="text-sm text-primary hover:underline">
												Forgot password?
											</a>
										{/if}
									</div>
									<Input
										{...props}
										type="password"
										class="mt-1 w-full"
										disabled={submitting}
										bind:value={$formData.password}
										{showPasswordToggle}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors class="text-sm text-destructive mt-1" />
						</Form.Field>
					</div>

					<Form.Button variant="default" class="w-full" disabled={submitting}>
						{#if submitting}
							<span class="flex items-center gap-2">
								<Spinner />
								<span>Processing...</span>
							</span>
						{:else}
							{buttonText}
						{/if}
					</Form.Button>

					<div class="relative my-6">
						<div class="absolute inset-0 flex items-center">
							<span class="w-full border-t"></span>
						</div>
						<div class="relative flex justify-center text-xs uppercase">
							<span class="bg-card px-2 text-muted-foreground">Or continue with</span>
						</div>
					</div>

					<div class:opacity-50={submitting} class:pointer-events-none={submitting}>
						<GoogleSignIn />
					</div>
				</form>
			</div>

			<div class="text-center text-sm text-muted-foreground">
				{footerText}{' '}
				<a href={footerLinkHref} class="text-primary hover:underline font-medium">
					{footerLinkText}
				</a>
			</div>
		</div>
	</div>
</div>
