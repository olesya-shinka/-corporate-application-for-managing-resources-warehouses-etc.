import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        itemsList: [],
    },
    reducers: {
        setItems(state, action) {
            state.itemsList = action.payload;
        },
    },
});

export const { setItems } = itemsSlice.actions;
export default itemsSlice.reducer;