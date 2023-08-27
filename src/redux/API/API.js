import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const REACT_APP_URL_API = process.env.REACT_APP_URL_API;


export const apiSlice = createApi({
    reducerPath: 'Tasks',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3004` }),
    endpoints: (builder) => ({
        getAllTasks: builder.query({
            query: () => ({
                url: `/tasks`,
                method: "GET"
            }),
            providesTags: ['AllTasks'],
        }),
        getSingleTask: builder.query({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: "GET"
            }),
            providesTags: ['SingleTask'],
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ["AllTasks", 'SingleTask'],
        }),
        removeCheckedTasks: builder.mutation({
            query: (payload) => ({
                url: '/tasks',
                method: 'DELETE',
                body: JSON.stringify({ ids: payload }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['SingleTask', "AllTasks"],
        }),
        addTask: builder.mutation({
            query: (taskObj) => ({
                url: `/tasks`,
                method: 'POST',
                body: taskObj,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ["AllTasks", 'SingleTask'],
        }),
        updateTask: builder.mutation({
            query: ({ id, ...taskObj }) => ({
                url: `/tasks/${id}`,
                method: "PUT",
                body: taskObj,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['SingleTask', "AllTasks"],
        }),
        searchTask: builder.query({
            query: (params) => `/tasks/search?q=${params}`
        }),
    })
})

export const {
    useGetAllTasksQuery,
    useDeleteTaskMutation,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useGetSingleTaskQuery,
    useRemoveCheckedTasksMutation,
    useSearchTaskQuery,
} = apiSlice

