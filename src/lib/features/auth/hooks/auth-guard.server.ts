// Middleware to protect private routes and manage authentication redirects
import { type Handle, redirect } from '@sveltejs/kit';
import { AUTH_PATHS, AUTH_REDIRECT_PATHS } from '../config/auth';

export const authGuard: Handle = async ({ event, resolve }) => {
	const { session, user } = await event.locals.safeGetSession();
	event.locals.session = session;
	event.locals.user = user;

	// Protect all routes under /private
	if (!event.locals.session && event.url.pathname.startsWith('/private')) {
		throw redirect(303, AUTH_PATHS.LOGIN);
	}

	// Redirect authenticated users away from auth pages
	if (event.locals.session && event.url.pathname === '/auth') {
		throw redirect(303, AUTH_REDIRECT_PATHS.SUCCESS.LOGIN);
	}

	return resolve(event);
};
