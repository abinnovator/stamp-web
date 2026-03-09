import { create } from 'zustand'

export const useChatSidebar = create((set) => ({
    open: false,
    setOpen: (open: boolean) => set({ open }),
    openChat: () => set({ open: true }),
    closeChat: () => set({ open: false }),
})) 
