// Server hooks for authentication and route protection middleware
import { sequence } from '@sveltejs/kit/hooks';
import { supabase } from '$lib/features/auth/hooks/supabase.server';
import { authGuard } from '$lib/features/auth/hooks/auth-guard.server';
import '$lib/utils/supabase-session-warnings';

export const handle = sequence(supabase, authGuard);
