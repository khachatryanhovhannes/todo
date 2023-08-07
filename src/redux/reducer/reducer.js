import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toDoList: []
}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        getAllTasks(state, action) {
            state.toDoList = action.payload
        },
        removeSingleTask(state, action) {
            state.toDoList = state.toDoList.filter(item => item.id !== action.payload)
        },
        addTask(state, action){
            state.toDoList = [...state.toDoList, action.payload]
        }
    },
})

export const { getAllTasks, removeSingleTask, addTask} = taskSlice.actions;
export default taskSlice.reducer;