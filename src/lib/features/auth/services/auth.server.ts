// Authentication service for handling user login and registration
import { fail, setError } from 'sveltekit-superforms';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { SuperValidated } from 'sveltekit-superforms';
import type { z } from 'zod';
import { loginSchema, registerSchema } from '../schemas/auth';
import { AUTH_REDIRECT_PATHS } from '$lib/features/auth/config/auth';

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

// Handles user login with Supabase authentication
export async function handleLogin(event: RequestEvent, form: SuperValidated<LoginFormData>) {
	if (!form.valid) {
		return fail(400, { form });
	}

	const supabase = event.locals.supabase;
	const { email, password } = form.data;
	const { error: signInError } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (signInError) {
		const errorMessage =
			signInError.message === 'Invalid login credentials'
				? 'Invalid email or password'
				: 'An error occurred during login. Please try again later.';
		return setError(form, '', errorMessage);
	}

	throw redirect(303, AUTH_REDIRECT_PATHS.SUCCESS.LOGIN);
}

// Handles new user registration with validation and error handling
export async function handleRegister(event: RequestEvent, form: SuperValidated<RegisterFormData>) {
	if (!form.valid) {
		return fail(400, { form });
	}

	const supabase = event.locals.supabase;
	const { email, password } = form.data;
	const { error: signUpError } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				created_at: new Date().toISOString()
			}
		}
	});

	if (signUpError) {
		let errorMessage = 'Error creating account';
		if (signUpError.message.includes('already registered')) {
			errorMessage = 'This email is already registered';
		} else if (signUpError.message.includes('password')) {
			errorMessage = 'Password does not meet requirements';
		}
		return setError(
			form,
			signUpError.message.includes('already registered') ? 'email' : 'password',
			errorMessage
		);
	}

	throw redirect(303, AUTH_REDIRECT_PATHS.SUCCESS.REGISTER);
}
