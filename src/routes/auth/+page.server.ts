// Main authentication page handling both login and registration
import { redirect, type Actions } from '@sveltejs/kit';
import { loginSchema, registerSchema } from '$lib/features/auth/schemas/auth';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { AUTH_REDIRECT_PATHS } from '$lib/features/auth/config/auth';

// Initialize auth forms based on mode (login/register)
export const load: PageServerLoad = async ({ parent, url }) => {
	const parentData = await parent();

	// Redirect to private if already logged in
	if (parentData.session) {
		throw redirect(303, AUTH_REDIRECT_PATHS.SUCCESS.LOGIN);
	}

	const mode = url.searchParams.get('mode');

	// Initialize both forms
	const loginForm = await superValidate(zod(loginSchema));
	const registerForm = await superValidate(zod(registerSchema));

	return {
		...parentData,
		form: mode === 'register' ? registerForm : loginForm
	};
};

// Handle form submissions for both login and registration
export const actions: Actions = {
	login: async ({ request, locals: { supabase } }: RequestEvent) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			// Return validation errors from zod schema
			return message(form, 'Please check the form for errors');
		}

		const { error } = await supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password
		});

		if (error) {
			const errorMessage =
				error.message === 'Invalid login credentials'
					? 'Invalid email or password'
					: 'An error occurred during login. Please try again later.';
			return message(form, errorMessage, { status: 400 });
		}

		throw redirect(303, AUTH_REDIRECT_PATHS.SUCCESS.LOGIN);
	},

	register: async ({ request, locals: { supabase } }: RequestEvent) => {
		const form = await superValidate(request, zod(registerSchema));

		if (!form.valid) {
			// Return specific validation errors from zod schema
			return message(form, 'Please check the form for errors');
		}

		// Get the site URL for email confirmation
		const siteUrl = new URL(request.url);
		const redirectTo = `${siteUrl.protocol}//${siteUrl.host}/auth/confirm`;

		const { error } = await supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				emailRedirectTo: redirectTo
			}
		});

		if (error) {
			return message(form, error.message, { status: 400 });
		}

		// Redirect to confirmation message with email
		throw redirect(
			303,
			`${AUTH_REDIRECT_PATHS.FLOW.VERIFY}?email=${encodeURIComponent(form.data.email)}`
		);
	}
};
