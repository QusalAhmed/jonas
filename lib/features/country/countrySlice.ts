import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

// Small explicit types for the country state so TS knows the shape
interface CountryState {
    country: {
        id: string
        countryName: string
    }
}

const initialState: CountryState = {
    // start with an empty-but-shaped object to avoid `{}-index` errors
    country: {
        id: "",
        countryName: "",
    },
}

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        setCountry: (state, action: PayloadAction<string>) => {
            state.country = {
                id: nanoid(),
                countryName: action.payload,
            }
        },
        removeCountry: (state, action: PayloadAction<string>) => {
            const data = state.country;
            if (data.id === action.payload) {}
        }
    },
})

export const { setCountry, removeCountry } = countrySlice.actions;
export default countrySlice.reducer;