export function scrollIntoView(id: string)
{
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
        behavior: 'auto'
    });
}

export enum MessageStatus
{
    sent = "sent",
    delivered = "delivered",
    seen = "seen"
}

export enum TypingStatus
{
    start,
    stop
}

