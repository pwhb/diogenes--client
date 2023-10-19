import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getMany, getOne, getOneByToken } from '$lib/services/api/common';
import { Collections } from '$lib/consts/db';

export const load: PageServerLoad = async ({ locals, params }) =>
{
    try
    {
        const room = await getOneByToken(Collections.rooms, locals.token, params.id, "/getbyToken");
        return {
            room: room.data
        };

    } catch (e)
    {
        console.error(e);
        throw error(404, 'Not found');
    }
};
