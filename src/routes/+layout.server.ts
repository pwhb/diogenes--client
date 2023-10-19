import type { LayoutServerLoad } from "./$types";
import { getOne, getOneByKey } from "$lib/services/api/common";
import { Collections } from "$lib/consts/db";


export const load: LayoutServerLoad = async ({ locals, url }) =>
{
    const config = await getOneByKey(Collections.configs, "frontend");
    const response: any = {
        config: config.data
    };
    
    if (locals.user_id)
    {
        const data = await getOne(Collections.users, locals.user_id);
        response.user = data.data;
        response.user_id = locals.user_id;
        response.token = locals.token;
    }
    return response;

};
