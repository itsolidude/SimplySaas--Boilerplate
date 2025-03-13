/**
 * Configuration constants for authentication flows
 */

export const AUTH_PATHS = {
	/** Main auth routes with mode parameters */
	LOGIN: '/auth?mode=login',
	REGISTER: '/auth?mode=register'
} as const;

export const AUTH_REDIRECT_PATHS = {
	/** Redirect paths after successful actions */
	SUCCESS: {
		/** After successful login */
		LOGIN: '/private/dashboard',
		/** After successful registration */
		REGISTER: '/auth/login',
		/** After successful password update */
		PASSWORD_UPDATE: '/auth?message=Password updated successfully',
		/** After successful OAuth callback */
		OAUTH: '/private/dashboard',
		/** After successful logout */
		LOGOUT: '/'
	},

	/** Redirect paths for error states */
	ERROR: {
		/** Generic auth error page */
		DEFAULT: '/auth/error',
		/** Failed verification */
		VERIFICATION: '/auth'
	},

	/** Routes for handling specific authentication processes and user actions */
	FLOW: {
		/** Route to request a password reset - displays form to enter email for reset link */
		RESET: '/auth/reset',
		/** Route to handle email verification - where users land after clicking verify link */
		VERIFY: '/auth/verify',
		/** Route to set a new password - used after reset link or requiring password update */
		UPDATE_PASSWORD: '/auth/update-password'
	}
} as const;

/**
 * Helper to construct verification URLs for email links
 */
export function getRedirectURL(request: Request, path: string): string {
	const url = new URL(request.url);
	return `${url.protocol}//${url.host}${path}`;
}

/**
 * Password validation configuration
 */
export const PASSWORD_VALIDATION = {
	/** Minimum length requirement for passwords */
	MIN_LENGTH: 8
} as const;

/**
 * OAuth configuration
 */
export const OAUTH_CONFIG = {
	/** Default redirect path after OAuth sign in */
	REDIRECT_PATH: '/auth/callback',
	/** Options for OAuth providers */
	PROVIDER_OPTIONS: {
		/** Config Google OAuth options */
		GOOGLE: {
			queryParams: {
				access_type: 'online',
				prompt: 'select_account'
			}
		}
	}
} as const;
