import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authMiddleware: Handle = async ({ event, resolve }) =>
{
	try
	{
		// event.locals.token = "eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2NTFiOWE4ZjQ3MzY3MTczZDM0MTM0ZWIiLCJleHAiOjE2OTc4MDQ5Mzl9.glhDAVW_M7BAYzEumhOZILNxNKPMY4dfm8BMv4GRsy4";
		// event.locals.user_id = "651b9a8f47367173d34134eb";
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
