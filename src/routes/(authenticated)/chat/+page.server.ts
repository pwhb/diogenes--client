import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getMany, getManyByToken, getOne } from '$lib/api/common';
import { Collections } from '$lib/consts/db';

export const load: PageServerLoad = async ({ locals }) =>
{
    try
    {
        const rooms = await getManyByToken(Collections.rooms, locals.token, "/getbyToken");
        return {
            rooms: rooms.data
        };

    } catch (e)
    {
        console.error(e);
        throw error(404, 'Not found');
    }
};
