// Handles email verification OTP token validation and user confirmation
import type { EmailOtpType } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { AUTH_REDIRECT_PATHS } from '$lib/features/auth/config/auth';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const token_hash = url.searchParams.get('token_hash');
	const type = url.searchParams.get('type') as EmailOtpType | null;
	const next = url.searchParams.get('next') ?? AUTH_REDIRECT_PATHS.SUCCESS.OAUTH;

	// Clean up the redirect URL
	const redirectTo = new URL(url);
	redirectTo.pathname = next;
	redirectTo.searchParams.delete('token_hash');
	redirectTo.searchParams.delete('type');

	if (token_hash && type) {
		const { error } = await supabase.auth.verifyOtp({ type, token_hash });
		if (!error) {
			redirectTo.searchParams.delete('next');
			throw redirect(303, redirectTo);
		}
	}

	// If verification fails, redirect to auth page with error
	redirectTo.pathname = AUTH_REDIRECT_PATHS.ERROR.VERIFICATION;
	redirectTo.searchParams.set('error', 'verification-failed');
	throw redirect(303, redirectTo);
};
