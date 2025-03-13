/**
 * Utility to suppress specific Supabase session warnings that occur during SvelteKit's SSR.
 *
 * These warnings appear because:
 * 1. SvelteKit's server-side rendering needs to serialize data between server and client
 * 2. During serialization, SvelteKit accesses session.user which triggers Supabase's security warning
 * 3. The Supabase client internally calls getSession() when making database queries
 *
 * My implementation uses safeGetSession() where I compare getSession() against getUser(),
 * so these warnings are safe to ignore. For more context about this issue, see:
 * https://github.com/supabase/auth-js/issues/873
 *
 * Only suppresses specific buggy Supabase session warnings while preserving all other
 * console warnings and logs. It's imported in hooks.server.ts to enable suppression from
 * the start of the server.
 */

const IGNORED_WARNINGS = [
	'Using supabase.auth.getSession() is potentially insecure',
	'Using the user object as returned from supabase.auth.getSession()'
];

// Store original console methods
const originalWarn = console.warn;
const originalLog = console.log;

// Override console methods to filter out specific warnings
console.warn = function (...args) {
	const shouldSuppress = args.some(
		(arg) => typeof arg === 'string' && IGNORED_WARNINGS.some((warning) => arg.includes(warning))
	);
	if (!shouldSuppress) {
		originalWarn.apply(console, args);
	}
};

console.log = function (...args) {
	const shouldSuppress = args.some(
		(arg) => typeof arg === 'string' && IGNORED_WARNINGS.some((warning) => arg.includes(warning))
	);
	if (!shouldSuppress) {
		originalLog.apply(console, args);
	}
};
