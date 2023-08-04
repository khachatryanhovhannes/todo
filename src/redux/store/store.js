import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { getAllTasks } from '../API/API'

export const store = configureStore({
  reducer: {
    [getAllTasks.reducerPath]: getAllTasks.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getAllTasks.middleware),
})

setupListeners(store.dispatch)