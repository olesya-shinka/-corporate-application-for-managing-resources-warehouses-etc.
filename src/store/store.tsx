import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import itemsReducer from "./slice/itemsSlice";
import { api } from "../api";

export const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
