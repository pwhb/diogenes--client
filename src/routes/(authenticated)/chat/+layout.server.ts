import { error } from '@sveltejs/kit';
import { getManyByToken } from '$lib/services/api/common';
import { Collections } from '$lib/consts/db';
import type { LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = async ({ locals }) =>
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
