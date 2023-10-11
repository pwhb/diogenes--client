import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authMiddleware: Handle = async ({ event, resolve }) =>
{
	try
	{
		const user_id = event.cookies.get('user_id');
		const token = event.cookies.get('token');

		if (user_id && token)
		{
			event.locals.user_id = user_id
			event.locals.token = token;
			console.log('user found');
		} else
		{
			console.log('user not found');
		}
	} catch (err)
	{
		console.error(err);
	}

	return await resolve(event);
};

export const handle = sequence(authMiddleware);
