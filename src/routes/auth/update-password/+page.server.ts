// Password update handling with code verification and session management
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updatePasswordSchema } from '$lib/features/auth/schemas/auth';
import { AUTH_REDIRECT_PATHS } from '$lib/features/auth/config/auth';

// Verify reset code and initialize password update form
export const load: PageServerLoad = async ({ url, locals: { supabase, safeGetSession } }) => {
	const code = url.searchParams.get('code');

	if (!code) {
		redirect(303, AUTH_REDIRECT_PATHS.FLOW.RESET);
	}

	// Exchange code for session first
	const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
	if (exchangeError) {
		redirect(303, AUTH_REDIRECT_PATHS.FLOW.RESET);
	}

	// Validate the new session is secure using safeGetSession
	const { session } = await safeGetSession();
	if (!session) {
		redirect(303, AUTH_REDIRECT_PATHS.FLOW.RESET);
	}

	return {
		form: await superValidate(zod(updatePasswordSchema))
	};
};

// Handle password update submission and user signout
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(updatePasswordSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { supabase } = event.locals;
		const { error } = await supabase.auth.updateUser({
			password: form.data.password
		});

		if (error) {
			console.log('Password update error:', error);

			// Check for specific Supabase error codes/messages for password reuse
			if (error.message?.toLowerCase().includes('previous')) {
				form.message = 'New password cannot be the same as your current password';
			} else {
				form.message = error.message || 'Failed to update password';
			}

			// Return with form object that includes the message
			return fail(400, { form });
		}
		// Sign out the user after successful password update
		await supabase.auth.signOut();

		// Redirect to login page with success message
		throw redirect(303, AUTH_REDIRECT_PATHS.SUCCESS.PASSWORD_UPDATE);
	}
};
