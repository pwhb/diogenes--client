import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getMany, getOne } from '$lib/api/common';
import { Collections } from '$lib/consts/db';

export const load: PageServerLoad = async ({ params }) =>
{
    try
    {
        const [data, avatars, wallpapers, followers, followings] = await Promise.all([
            await getOne(Collections.users, params.id),
            await getMany(Collections.assets, "?limit=100&category=avatar&active=true"),
            await getMany(Collections.assets, "?limit=100&category=wallpaper&active=true"),
            await getMany(Collections.followings, `?limit=1000&followed=${params.id}`),
            await getMany(Collections.followings, `?limit=1000&follower=${params.id}`)
        ]);



        return {
            data: data.data,
            avatars: avatars.data,
            wallpapers: wallpapers.data,
            followers: followers,
            followings: followings
            // wallpapers: wallpapers.data
        };


        throw error(404, 'Not found');

    } catch (e)
    {
        console.error(e);
        throw error(404, 'Not found');
    }
};
