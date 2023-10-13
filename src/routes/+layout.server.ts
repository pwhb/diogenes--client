import type { LayoutServerLoad } from "./$types";
import { getOneByKey } from "$lib/api/common";
import { Collections } from "$lib/consts/db";


export const load: LayoutServerLoad = async ({ locals, url }) =>
{
    const config = await getOneByKey(Collections.configs, "frontend");
    return {
        config: config.data
    };

};
