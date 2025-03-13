// Email verification handling for new user signups
import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Load email from URL params or current session
export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
	let email = url.searchParams.get('email');

	// If no email in URL, try to get it from the session
	if (!email) {
		const {
			data: { session }
		} = await supabase.auth.getSession();
		email = session?.user?.email || null;
	}

	return { email };
};

// Handle resending verification emails to users
export const actions: Actions = {
	resend: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');

		if (!email || typeof email !== 'string') {
			return fail(400, { message: 'Email is required' });
		}

		try {
			const origin = request.headers.get('origin');
			if (!origin) {
				throw new Error('Origin header is required');
			}

			const { error: resendError } = await supabase.auth.resend({
				type: 'signup',
				email,
				options: {
					emailRedirectTo: `${origin}/auth/confirm`
				}
			});

			if (resendError) {
				return fail(400, {
					message: resendError.message
				});
			}

			return {
				success: true
			};
		} catch (err) {
			console.error('Error in resend action:', err);
			return fail(500, {
				message: 'An unexpected error occurred'
			});
		}
	}
};
