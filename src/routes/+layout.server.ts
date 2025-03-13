// Root layout server load function that provides session and user data to all routes
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
	const { session, user } = await safeGetSession();
	return {
		session,
		user,
		cookies: cookies.getAll()
	};
};
