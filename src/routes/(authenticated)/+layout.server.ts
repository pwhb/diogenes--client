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
};
