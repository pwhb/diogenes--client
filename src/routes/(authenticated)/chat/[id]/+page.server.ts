import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getMany, getManyByToken, getOne, getOneByToken } from '$lib/services/api/common';
import { Collections } from '$lib/consts/db';

export const load: PageServerLoad = async ({ locals, params }) =>
{
    try
    {
        const room = await getOneByToken(Collections.rooms, locals.token, params.id, "/getbyToken");

        if (!room || !room.data)
        {
            throw Error("Unauthorized");
        }
        const messages = await getManyByToken(Collections.messages, locals.token, "/getbyToken", `?roomId=${params.id}&limit=100`);


        return {
            room: room.data,
            messages: messages.data
        };

    } catch (e)
    {
        console.error(e);
        throw redirect(302, '/chat');
    }
};
