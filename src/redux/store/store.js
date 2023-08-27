import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../API/API'
import taskReducer from '../reducer/reducer'
import { userAPI } from '../API/userAPI';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    taskReducer: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware, userAPI.middleware]),

})

export { store }