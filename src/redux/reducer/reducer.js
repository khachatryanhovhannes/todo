import { createSlice } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();

const initialState = {
    toDoList: [],
    editTaskObj: {},
    checkedTasks: new Set()
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
        },
        getTaskInfoInEditModal(state, action) {
            state.editTaskObj = action.payload
        },
        changeCheckedTasks(state, action) {
            const taskID = action.payload
            // if (state.checkedTasks.has(taskID)) {
                // state.checkedTasks = state.checkedTasks.delete(taskID);
                // console.log(state.checkedTasks)
            // } 
            // else {
            //     state.checkedTasks = state.checkedTasks.add(taskID);
            // }
        }
    },
})

export const { getAllTasks, removeSingleTask, addTask, editTask, getTaskInfoInEditModal, changeCheckedTasks } = taskSlice.actions;
export default taskSlice.reducer;