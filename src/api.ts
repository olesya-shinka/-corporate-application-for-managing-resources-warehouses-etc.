// export const getItems = async (token: string) => {
//     try {
//         const res = await fetch('https://hcateringback-dev.unitbeandev.com/api/items?page=1&pageSize=10', {
//             method: "GET",
//             headers: {
//                 'Authorization': token
//             },
//         });
//         const data = await res.json();
//         return data;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Failed to fetch items');
//     }
// }

// export const loginUser = async (login: String, password: String) => {
//     try {
//         const res = await fetch(`https://hcateringback-dev.unitbeandev.com/api/auth/login`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 login: login,
//                 password: password
//             })
//         });
//         const data = await res.json();
//         if (res.status === 200) {
//             return data.access_token;
//         } else {
//             throw new Error(data.message || 'Failed to login');
//         }
//     } catch (error) {
//         console.error(error);
//         throw new Error('Failed to login');
//     }
// }

// export async function fetchData() {
//     try {
//         const token = await loginUser('admin', 'admin');
//         const items = await getItems(token);
//         console.log(items);
//     } catch (error) {
//         console.error('Failed to fetch data:', error);
//     }
// }
// fetchData()

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
        getItems: builder.query<any, { page: number }>({
            query: ({ page }) => `items?page=${page}&pageSize=10`,
        }),
    }),
});

export const { useLoginMutation, useGetItemsQuery } = api;