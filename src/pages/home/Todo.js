import { useState, useEffect } from "react";
import AddTaskModal from "../../componenets/modals/addTaskModal/AddTaskModal";
import styles from "./todo.module.css"
import SingleTodo from "./singleTodo/SingleTodo";
import RemoveCheckedTaskModal from "../../componenets/modals/removeCheckedTaskModal/RemoveCheckedTaskModal";
import EditTaskModal from "../../componenets/modals/editTaskModal/EditTaskModal";
import { useDeleteTaskMutation, useGetAllTasksQuery } from "../../redux/API/API";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks, removeSingleTask, clearCheckedTasks } from "../../redux/reducer/reducer";
import { showSuccesMessage, showErrorMessage } from "../../componenets/Toastify/Toastify";


export default function Todo() {
    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetAllTasksQuery()
    const toDoList = useSelector((state) => state.taskReducer.toDoList)
    const [deleteTask, result] = useDeleteTaskMutation()
    const editTaskObj = useSelector((state) => state.taskReducer.editTaskObj)
    const checkedTasks = useSelector((state) => state.taskReducer.checkedTasks)
    const [toggleConfirmModal, setToggleConfirmModal] = useState(false)
    const [showNewTaskModal, setShowNewTaskModal] = useState(false)




    useEffect(() => {
        if (data) {
            dispatch(getAllTasks(data))
        }
    }, [data])


    function handleShowAddModal() {
        setShowNewTaskModal(!showNewTaskModal)
    }


    function handleRemovedCheckedTasks() {
        checkedTasks.forEach(itemId => {
            deleteTask(itemId)
                .then(() => {
                    dispatch(removeSingleTask(itemId))
                })
                .catch(()=> {
                    showErrorMessage()
                })
        })
        showSuccesMessage()
        handleToggleShowCofirmModal()
        dispatch(clearCheckedTasks())
    }

    function handleToggleShowCofirmModal() {
        setToggleConfirmModal(!toggleConfirmModal)
    }

    return (
        <>
            <div className={styles.addButton}>
                <button onClick={handleShowAddModal}
                    disabled={checkedTasks.length}
                >Add task</button>
            </div>
            <div className={styles.pageControls}>
                {<button onClick={handleToggleShowCofirmModal}
                    disabled={!checkedTasks.length}
                >Remove checked tasks</button>}
            </div>
            {showNewTaskModal && <AddTaskModal
                handleShowAddModal={handleShowAddModal}
            />}
            <div className={styles.drawTodoList}>
                {
                    isLoading && <h1>Loading...</h1>
                }

                {
                    toDoList && toDoList.map((todo => {
                        return (
                            <div className={styles.singleTodo}
                                key={todo.id}
                                style={todo.importance === "High" ? { backgroundColor: "rgb(255 181 181)" } : todo.importance === "Medium" ? { backgroundColor: "rgb(232 185 255)" } : { backgroundColor: "rgb(197 234 255)" }}>
                                <SingleTodo todo={todo} />
                            </div>
                        )
                    }))
                }
            </div>
            {toggleConfirmModal && <RemoveCheckedTaskModal
                count={checkedTasks.length}
                handleRemovedCheckedTasks={handleRemovedCheckedTasks}
                handleToggleShowCofirmModal={handleToggleShowCofirmModal}
            />}
            {Object.keys(editTaskObj).length && <EditTaskModal />}
        </>
    )
}