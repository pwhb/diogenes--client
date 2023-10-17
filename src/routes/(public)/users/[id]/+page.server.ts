import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getMany, getOne } from '$lib/api/common';
import { Collections } from '$lib/consts/db';

export const load: PageServerLoad = async ({ params }) =>
{
    try
    {
        const data = await getOne(Collections.users, params.id);
        const avatars = await getMany(Collections.assets, "?limit=100&category=avatar&active=true");
        const wallpapers = await getMany(Collections.assets, "?limit=100&category=wallpaper&active=true");
        if (data)
        {
            return {
                data: data.data,
                avatars: avatars.data,
                wallpapers: wallpapers.data
            };
        }

        throw error(404, 'Not found');

    } catch (e)
    {
        console.error(e);
        throw error(404, 'Not found');
    }
};
