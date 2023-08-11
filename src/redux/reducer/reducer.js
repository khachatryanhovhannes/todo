import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    toDoList: [],
    editTaskObj: {},
    checkedTasks: [],
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
            const taskId = action.payload
            if (state.checkedTasks.find(id => id == taskId)) {
                const itemIndex = state.checkedTasks.findIndex(id => id == taskId)
                state.checkedTasks.splice(itemIndex, 1)
            }
            else {
                state.checkedTasks = [...state.checkedTasks, taskId]
            }
        },
        clearCheckedTasks(state){
            state.checkedTasks = []
        },
    },
})

export const { getAllTasks, removeSingleTask, addTask, editTask, getTaskInfoInEditModal, changeCheckedTasks, clearCheckedTasks } = taskSlice.actions;
export default taskSlice.reducer;

