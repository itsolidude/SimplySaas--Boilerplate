// Server-side registration page handling with form validation
import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';
import { registerSchema } from '$lib/features/auth/schemas/auth';
import { handleRegister } from '$lib/features/auth/services/auth.server';

// Initialize registration form with validation schema
export const load: PageServerLoad = async ({ parent }) => {
	const parentData = await parent();
	return {
		...parentData,
		form: await superValidate(zod(registerSchema))
	};
};

// Handle registration form submission and account creation
export const actions: Actions = {
	register: async (event) => {
		const form = await superValidate(event, zod(registerSchema));
		return handleRegister(event, form);
	}
};
