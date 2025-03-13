<script lang="ts">
	import type { PageData } from './$types';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { resetPasswordSchema, type ResetPasswordSchema } from '$lib/features/auth/schemas/auth';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Spinner } from '$lib/components/ui/spinner';
	import IconInformation from '~icons/heroicons/information-circle-20-solid';
	import IconArrowLeft from '~icons/heroicons/arrow-left-20-solid';
	import { Logo } from '$lib/components/ui/logo';
	import { AUTH_PATHS } from '$lib/features/auth/config/auth';

	let { data } = $props<{ data: { form: SuperValidated<Infer<typeof resetPasswordSchema>> } }>();

	const form = superForm<Infer<typeof resetPasswordSchema>>(data.form, {
		validators: zodClient(resetPasswordSchema)
	});

	const { enhance, message, form: formData, submitting } = form;
</script>

<div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
	<div class="w-full max-w-md bg-white rounded-lg border shadow-lg p-6 space-y-6">
		<div class="space-y-2 text-center">
			<div class="flex justify-center mb-2">
				<a href="/" class="block" data-sveltekit-preload-data>
					<Logo size="lg" />
				</a>
			</div>
			<h1 class="text-2xl font-bold">Reset Password</h1>
			<p class="text-muted-foreground text-sm">Enter your email to receive a reset link</p>
		</div>

		<div class="space-y-6">
			{#if $message}
				<div
					class="flex flex-col p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md space-y-4"
				>
					<div class="flex flex-col items-center text-center space-y-2">
						<div class="bg-blue-100 p-3 rounded-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8 text-blue-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div class="space-y-1">
							<h3 class="text-xl font-semibold text-blue-800">Check Your Email</h3>
							<p class="text-blue-700 text-sm max-w-sm">
								If an account exists with this email, you will receive a password reset link
								shortly. Please check your inbox or spam folder.
							</p>
						</div>
					</div>
				</div>
			{:else}
				<form method="POST" use:enhance class="space-y-4">
					<div class="space-y-2">
						<Form.Field {form} name="email">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Email</Form.Label>
									<Input
										{...props}
										type="email"
										bind:value={$formData.email}
										autocomplete="email"
										placeholder="m@example.com"
										class="mt-1 w-full"
										disabled={$submitting}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors class="text-sm text-destructive mt-1" />
						</Form.Field>
					</div>

					<Form.Button variant="default" class="w-full" disabled={$submitting}>
						{#if $submitting}
							<span class="flex items-center gap-2">
								<Spinner />
								<span>Sending reset link...</span>
							</span>
						{:else}
							Send Reset Link
						{/if}
					</Form.Button>
				</form>
			{/if}

			<div class="text-center text-sm text-muted-foreground">
				<a
					href={AUTH_PATHS.LOGIN}
					class="text-primary hover:bg-primary/10 hover:text-primary/80 flex items-center justify-center gap-1 transition-colors rounded-md px-2 py-1"
				>
					<IconArrowLeft class="h-4 w-4" />
					Back to Login
				</a>
			</div>
		</div>
	</div>
</div>
