import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const REACT_APP_URL_API = process.env.REACT_APP_URL_API;


export const getAllTasks = createApi({
    reducerPath: 'getAllTasks',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3004`}),
    endpoints: (builder) => ({
        getAllTasks: builder.query({
            query: () => `/tasks`,
        }),
    }),
})


export const {useGetAllTasksQuery} = getAllTasks

