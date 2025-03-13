// Settings page server load that provides user data for the settings interface
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user } }) => {
	if (!user) {
		return {};
	}

	return {
		user
	};
};
