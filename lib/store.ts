import { configureStore, combineReducers } from '@reduxjs/toolkit'
import countryReducer from '@/lib/features/country/countrySlice'
import cartReducer from '@/lib/features/cart/cartSlice'

const rootReducer = combineReducers({
    country: countryReducer,
    cart: cartReducer,
})

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']