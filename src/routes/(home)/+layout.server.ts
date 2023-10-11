import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from "./$types";
import { getOne } from "$lib/api/common";
import { Collections } from "$lib/consts/db";


export const load: LayoutServerLoad = async ({ locals, url }) =>
{

    if (!locals.user_id)
    {
        throw redirect(302, '/auth/login');
    }
    const data = await getOne(Collections.users, locals.user_id);
    return {
        user: data.data,
        user_id: locals.user_id,
        token: locals.token,
    };
};
