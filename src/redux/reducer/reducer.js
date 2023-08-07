import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toDoList: [],
    // showAddModal: false
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
        addTask(state, action) {
            state.toDoList = [...state.toDoList, action.payload]
        },
        editTask(state, action) {
            state.toDoList[state.toDoList.findIndex(item => item.id == action.payload.id)] = action.payload
        }
    },
})

export const { getAllTasks, removeSingleTask, addTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;