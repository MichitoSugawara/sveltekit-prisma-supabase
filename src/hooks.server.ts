import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Database } from '$lib/supabase/schema';
import type { Session } from '@supabase/supabase-js';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma/client';

export const handle: Handle = async ({ event, resolve }) => {
	const supabase = createSupabaseServerClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	event.locals.supabase = supabase;

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await supabase.auth.getSession();
		return session;
	};

	event.locals.getProfile = async (session: Session) => {
		if (!session) return null;

		const profile = await prisma.profile.findUnique({where:{user_id: session.user.id}})
		return profile;
	};

	// To protect session routes
	if (event.route.id?.startsWith('/(protected)')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/auth');
		}

		const profile = await event.locals.getProfile(session);
		if (event.route.id?.startsWith('/(protected)/(registrated)') && !profile) {
			throw redirect(303, '/registration');
		}
		if (event.route.id?.startsWith('/(protected)/registration') && profile)
			throw redirect(303, '/chat');
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
