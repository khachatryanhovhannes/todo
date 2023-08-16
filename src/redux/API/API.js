import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const REACT_APP_URL_API = process.env.REACT_APP_URL_API;


export const apiSlice = createApi({
    reducerPath: 'getAllTasks',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3004` }),
    endpoints: (builder) => ({
        getAllTasks: builder.query({
            query: () => ({
                url: `/tasks`,
                method: "GET"
            })
        }),
        getSingleTask: builder.query({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: "GET"
            })
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: 'DELETE',
            }),
        }),
        removeCheckedTasks: builder.mutation({
            query: (payload) => ({
                url: '/tasks',
                method: 'DELETE',
                body: JSON.stringify({ ids: payload }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        addTask: builder.mutation({
            query: (taskObj) => ({
                url: `/tasks`,
                method: 'POST',
                body: taskObj
            })
        }),
        updateTask: builder.mutation({
            query: ({ id, ...taskObj }) => ({
                url: `/tasks/${id}`,
                method: "PUT",
                body: taskObj,
            })
        }),
        searchTask: builder.query({
            query: (params) => `/tasks?q=${params}`
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
    useSearchTaskQuery
} = apiSlice

