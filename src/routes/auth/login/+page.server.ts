// Server-side login page handling with form validation
import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';
import { loginSchema } from '$lib/features/auth/schemas/auth';
import { handleLogin } from '$lib/features/auth/services/auth.server';

// Initialize login form with validation schema
export const load: PageServerLoad = async ({ parent }) => {
	const parentData = await parent();
	return {
		...parentData,
		form: await superValidate(zod(loginSchema))
	};
};

// Handle login form submission and authentication
export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		return handleLogin(event, form);
	}
};
