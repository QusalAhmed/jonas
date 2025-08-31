import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

export type CartItem = {
    id: number
    title: string
    thumbnail: string
    unitPrice: number
    quantity: number
}

export type CartState = {
    items: CartItem[]
}

const initialState: CartState = {
    items: [],
}

function findIndex(items: CartItem[], id: number) {
    return items.findIndex((i) => i.id === id)
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem:
            (
                state,
                action: PayloadAction<{
                    id: number
                    title: string
                    thumbnail: string
                    unitPrice: number
                    quantity?: number
                }>
            ) => {
                const {id, title, thumbnail, unitPrice} = action.payload
                const quantity = Math.max(1, action.payload.quantity ?? 1)
                const idx = findIndex(state.items, id)
                if (idx >= 0) {
                    state.items[idx].quantity += quantity
                } else {
                    state.items.push({id, title, thumbnail, unitPrice, quantity})
                }
            },
        removeItem: (state, action: PayloadAction<{ id: number }>) => {
            state.items = state.items.filter((i) => i.id !== action.payload.id)
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ id: number; quantity: number }>
        ) => {
            const {id, quantity} = action.payload
            const idx = findIndex(state.items, id)
            if (idx >= 0) {
                state.items[idx].quantity = Math.max(1, quantity)
            }
        },
        clear: (state) => {
            state.items = []
        },
    },
})

export const {addItem, removeItem, updateQuantity, clear} = cartSlice.actions
export default cartSlice.reducer

// Selectors (memoized)
export const selectCartState = (state: { cart: CartState }) => state.cart
export const selectCartItems = createSelector(
  selectCartState,
  (cart) => cart.items
)
export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((acc, i) => acc + i.quantity, 0)
)
export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0)
)
