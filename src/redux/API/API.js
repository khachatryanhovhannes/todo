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
        deleteTask: builder.mutation({
            query: (taskId ) => ({
                url: `/tasks/${taskId}`,
                method: 'DELETE',
            }),
        }),
        addTask: builder.mutation({
            query: (taskObj) => ({
                url: `/tasks`,
                method: 'POST',
                body: taskObj
            })
        }),
        updateTask: builder.mutation({
            query: ({id, ...taskObj}) => ({
                url: `/tasks/${id}`,
                method: "PUT",
                body: taskObj,
            })
        })
    })
})



export const { useGetAllTasksQuery, useDeleteTaskMutation, useAddTaskMutation, useUpdateTaskMutation } = apiSlice

