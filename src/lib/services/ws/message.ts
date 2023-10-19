import { page } from "$app/stores";
import { PUBLIC_WS_URL } from "$env/static/public";
import type WsKeys from "$lib/consts/WsKeys";

export interface IMessage
{
    type: WsKeys;
    data: any;
}