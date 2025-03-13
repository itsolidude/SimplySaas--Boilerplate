<script lang="ts">
	import { loginSchema } from '$lib/features/auth/schemas/auth';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import AuthForm from './AuthForm.svelte';
	import { AUTH_PATHS } from '$lib/features/auth/config/auth';

	let { data, successMessage = null } = $props<{
		data: { form: SuperValidated<Infer<typeof loginSchema>> };
		successMessage?: string | null;
	}>();

	const form = superForm(data.form, {
		validators: zodClient(loginSchema),
		validationMethod: 'onsubmit'
	});

	const { enhance, message, submitting, form: formData } = form;
</script>

<AuthForm
	title="Welcome back"
	description="Enter your credentials to access your account"
	{form}
	{formData}
	formAction="?/login"
	buttonText="Sign In"
	submitting={$submitting}
	message={$message}
	{successMessage}
	showForgotPassword={true}
	footerText="Don't have an account?"
	footerLinkText="Sign up"
	footerLinkHref={AUTH_PATHS.REGISTER}
	{enhance}
/>
