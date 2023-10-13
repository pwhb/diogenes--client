import { Colors } from "$lib/consts/tailwind";
import { writable } from "svelte/store";

const modalTitle = writable("Please Confirm");

export const modalMessage = writable("");
export const modalMessageType = writable(Colors.error);