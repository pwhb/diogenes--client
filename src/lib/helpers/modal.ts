export const MODAL_ID = "diogenes_modal";

export function openModal(modalId: string = MODAL_ID)
{
    const el: any = document.getElementById(modalId);
    el.showModal();
}

export function closeModal(modalId: string = MODAL_ID)
{
    const el: any = document.getElementById(modalId);
    el.close();
}