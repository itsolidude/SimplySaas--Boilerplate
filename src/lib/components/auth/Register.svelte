<script lang="ts">
	import { registerSchema, type RegisterSchema } from '$lib/features/auth/schemas/auth';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import AuthForm from './AuthForm.svelte';

	let props = $props<{ data: { form: SuperValidated<Infer<RegisterSchema>> } }>();

	const form = superForm(props.data.form, {
		validators: zodClient(registerSchema),
		validationMethod: 'auto'
	});

	const { enhance, message, submitting, form: formData } = form;
</script>

<AuthForm
	title="Create an account"
	description="Sign up to get started"
	{form}
	{formData}
	formAction="?/register"
	buttonText="Create Account"
	submitting={$submitting}
	message={$message}
	footerText="Already have an account?"
	footerLinkText="Sign in"
	footerLinkHref="/auth?mode=login"
	{enhance}
	showPasswordToggle={true}
/>
