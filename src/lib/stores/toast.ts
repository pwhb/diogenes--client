import { Colors } from "$lib/consts/tailwind";
import { writable } from "svelte/store";

export const text = writable("");
export const type = writable(Colors.primary);
export const showToast = writable(false);

export function toast(message: string, timeout: number = 1200, color: Colors = Colors.primary)
{
    text.set(message);
    type.set(color);
    showToast.set(true);
    setTimeout(() =>
    {
        showToast.set(false);
        text.set("");
        type.set(Colors.primary);
    }, timeout);
}