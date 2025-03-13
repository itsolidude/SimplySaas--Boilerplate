<script lang="ts">
	import type { PageData } from './$types';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { updatePasswordSchema, type UpdatePasswordSchema } from '$lib/features/auth/schemas/auth';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Spinner } from '$lib/components/ui/spinner';
	import { ErrorMessage } from '$lib/components/ui/error-message';
	import { Logo } from '$lib/components/ui/logo';

	let props = $props<{ data: { form: SuperValidated<Infer<typeof updatePasswordSchema>> } }>();

	const form = superForm<Infer<typeof updatePasswordSchema>>(props.data.form, {
		validators: zodClient(updatePasswordSchema),
		validationMethod: 'auto'
	});

	const { enhance, message, form: formData, submitting } = form;
</script>

<div class="flex min-h-screen flex-col bg-background">
	<div class="flex min-h-screen flex-col items-center justify-center px-4 py-12">
		<div class="mx-auto w-full max-w-md space-y-6">
			<div class="flex flex-col items-center space-y-2 text-center">
				<a href="/" class="block" data-sveltekit-preload-data>
					<Logo size="lg" />
				</a>
				<h1 class="text-3xl font-bold text-foreground">Update Password</h1>
				<p class="text-muted-foreground" id="form-description">Create your new password</p>
			</div>

			<div class="space-y-4 bg-card p-8 rounded-xl border card-hover">
				<ErrorMessage message={$message} />

				<form method="POST" use:enhance class="space-y-4">
					<div class="space-y-2">
						<Form.Field {form} name="password">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>New Password</Form.Label>
									<Input
										{...props}
										type="password"
										bind:value={$formData.password}
										autocomplete="new-password"
										class="mt-1 w-full"
										disabled={$submitting}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors class="text-sm text-destructive mt-1" />
						</Form.Field>
					</div>

					<div class="space-y-2">
						<Form.Field {form} name="confirmPassword">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Confirm Password</Form.Label>
									<Input
										{...props}
										type="password"
										bind:value={$formData.confirmPassword}
										autocomplete="new-password"
										class="mt-1 w-full"
										showPasswordToggle
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
								<span>Updating password...</span>
							</span>
						{:else}
							Update Password
						{/if}
					</Form.Button>
				</form>
			</div>
		</div>
	</div>
</div>
