import { Colors } from "$lib/consts/tailwind";
import { writable } from "svelte/store";

export const toastTextStore = writable("");
export const toastTypeStore = writable(Colors.primary);
export const showToastStore = writable(false);

export function toast(message: string, timeout: number = 1200, color: Colors = Colors.primary)
{
    toastTextStore.set(message);
    toastTypeStore.set(color);
    showToastStore.set(true);
    setTimeout(() =>
    {
        showToastStore.set(false);
        toastTextStore.set("");
        toastTypeStore.set(Colors.primary);
    }, timeout);
}