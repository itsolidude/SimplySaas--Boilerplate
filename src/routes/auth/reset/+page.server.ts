// Password reset request handling with email validation
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { resetPasswordSchema } from '$lib/features/auth/schemas/auth';

// Initialize password reset form with validation schema
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(resetPasswordSchema))
	};
};

// Handle password reset request and send reset email
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(resetPasswordSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { supabase } = event.locals;
		const { error } = await supabase.auth.resetPasswordForEmail(form.data.email, {
			redirectTo: `${event.url.origin}/auth/update-password`
		});

		if (error) {
			return fail(400, {
				form,
				error: 'Failed to send reset password email'
			});
		}

		form.message =
			'If an account exists with this email, you will receive a password reset link shortly. Please check your inbox or spam.';
		return {
			form
		};
	}
};
