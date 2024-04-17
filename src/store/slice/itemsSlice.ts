import { createSlice } from '@reduxjs/toolkit';

interface Item {
    id: string;
    name: string;
    description: string;
    measurement_units: string;
    deposit: any;
}

const initialState = {
    allItems: [],
    searchResults: [],
};

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.allItems = action.payload;
            state.searchResults = [];
        },
        setSearchResults: (state, action) => {
            const { searchTerm } = action.payload;
            state.searchResults = state.allItems.filter((item: Item) => item.name.includes(searchTerm));
        },
    },
});

export const { setItems, setSearchResults } = itemsSlice.actions;
export default itemsSlice.reducer;