import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store/store";

const API_URL = "https://hcateringback-dev.unitbeandev.com/api/";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.access;
            if (token) {
                headers.set("Authorization", `${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ login, password }) => ({
                url: "auth/login",
                method: "POST",
                body: { login, password },
            }),
        }),
        getItems: builder.query<any, { page: number, pageSize: number }>({
            query: ({ page, pageSize }) => `wh/items?page=${page}&pageSize=${pageSize}`,
        }),
    }),
});

export const { useLoginMutation, useGetItemsQuery } = api;