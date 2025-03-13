// Handles OAuth callback and exchanges auth code for session
import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { AUTH_REDIRECT_PATHS } from '$lib/features/auth/config/auth';

export const GET = async (event: RequestEvent) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code');

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			throw redirect(303, AUTH_REDIRECT_PATHS.SUCCESS.OAUTH);
		}
	}

	// return the user to an error page with instructions
	throw redirect(303, AUTH_REDIRECT_PATHS.ERROR.DEFAULT);
};
