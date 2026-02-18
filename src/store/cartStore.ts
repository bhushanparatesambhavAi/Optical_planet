import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
    id: string
    productId: string
    name: string
    price: number
    image: string
    quantity: number
    variant?: string
}

interface CartState {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    getTotal: () => number
    getItemCount: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const items = get().items
                const existingItem = items.find((i) => i.id === item.id)

                if (existingItem) {
                    set({
                        items: items.map((i) =>
                            i.id === item.id
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        ),
                    })
                } else {
                    set({ items: [...items, item] })
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) })
            },
            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id)
                    return
                }
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, quantity } : i
                    ),
                })
            },
            clearCart: () => set({ items: [] }),
            getTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
            },
            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0)
            }
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
            skipHydration: true, // Important for Next.js hydration mismatch? No, better handling in component.
            // Actually skipHydration: true means we need to manually hydrate or handle hydration.
            // A common pattern is to use a hydration helper hook.
            // For simplicity I will leave it false (default) but handle mounted state in components if needed.
            // Or actually, setting skipHydration: true and rehydrating on mount is safer.
            // Let's use false for now and see if we get hydration errors. 
            // If so, we'll implement a useStore hook wrapper.
        }
    )
)
