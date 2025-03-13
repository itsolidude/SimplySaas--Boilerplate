// Validation schemas for authentication forms using Zod
import { z } from 'zod';
import { PASSWORD_VALIDATION } from '../config/auth';

// Email validation with format checking
const emailValidation = z
	.string()
	.trim()
	.superRefine((val, ctx) => {
		if (val.length === 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Email is required'
			});
			return;
		}

		if (!val.includes('@') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Please enter a valid email address'
			});
		}
	});

const loginPasswordValidation = z.string().min(1, { message: 'Password cannot be empty' });

// Full password validation for registration/updates
const passwordValidation = z
	.string()
	.trim()
	.refine((val) => val.length > 0, { message: 'Password is required' })
	.superRefine((val, ctx) => {
		if (val.length === 0) return;

		if (val.length < PASSWORD_VALIDATION.MIN_LENGTH) {
			ctx.addIssue({
				code: z.ZodIssueCode.too_small,
				minimum: PASSWORD_VALIDATION.MIN_LENGTH,
				type: 'string',
				inclusive: true,
				message: `Password should be at least ${PASSWORD_VALIDATION.MIN_LENGTH} characters`
			});
		}

		if (
			val.length >= PASSWORD_VALIDATION.MIN_LENGTH &&
			!/^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9])/.test(val)
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `Password should be at least ${PASSWORD_VALIDATION.MIN_LENGTH} characters, with a symbol`
			});
		}
	});

export const loginSchema = z.object({
	email: emailValidation,
	password: loginPasswordValidation
});

export const registerSchema = z.object({
	email: emailValidation,
	password: passwordValidation
});

export const resetPasswordSchema = z.object({
	email: emailValidation
});

export const updatePasswordSchema = z
	.object({
		password: passwordValidation,
		confirmPassword: z.string().trim()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	});

export type LoginSchema = typeof loginSchema;
export type RegisterSchema = typeof registerSchema;
export type ResetPasswordSchema = typeof resetPasswordSchema;
export type UpdatePasswordSchema = typeof updatePasswordSchema;
