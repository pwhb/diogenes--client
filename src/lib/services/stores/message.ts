import { writable } from "svelte/store";

export const socketStore = writable<WebSocket | undefined>();

export const messageStore = writable<any[]>([]);

export const membersStore = writable<any>();

export const typingStore = writable<any[]>([]);