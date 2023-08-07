import { useState, useEffect } from "react";
import { saveEditTask } from "../../../utils/API";
import AddTaskModal from "../../modals/addTaskModal/AddTaskModal";
import styles from "./todo.module.css"
import SingleTodo from "./singleTodo/SingleTodo";
import RemoveCheckedTaskModal from "../../modals/removeCheckedTaskModal/RemoveCheckedTaskModal";
import EditTaskModal from "../../modals/editTaskModal/EditTaskModal";
import { useDeleteTaskMutation, useGetAllTasksQuery } from "../../../redux/API/API";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks, removeSingleTask } from "../../../redux/reducer/reducer";


export default function Todo() {
    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetAllTasksQuery()
    const toDoList = useSelector((state) => state.taskReducer.toDoList)
    const [deleteTask, result] = useDeleteTaskMutation()


    const [editTask, setEditTask] = useState(null)
    const [showEditTaskModal, setShowEditTaskModal] = useState(false)
    let [checkedTasks, setCheckedTasks] = useState(new Set())
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

    function handleCheckedTasks(taskID) {
        checkedTasks = new Set(checkedTasks)
        if (checkedTasks.has(taskID)) {
            checkedTasks.delete(taskID);
        } else {
            checkedTasks.add(taskID);
        }
        setCheckedTasks(checkedTasks)
        console.log(checkedTasks)
    }

    function handleRemovedCheckedTasks() {
        checkedTasks.forEach(itemId => {
            deleteTask(itemId)
                .then(() => {
                    dispatch(removeSingleTask(itemId))
                })
        })
        handleToggleShowCofirmModal()
    }

    function handleToggleShowCofirmModal() {
        setToggleConfirmModal(!toggleConfirmModal)
    }


    function handleEditTaskModal() {
        setShowEditTaskModal(!showEditTaskModal)
    }

    function handleEditTask(taskObj) {
        setEditTask(taskObj)
        handleEditTaskModal()
    }

   

    return (
        <>
            <div className={styles.addButton}>
                <button onClick={handleShowAddModal}
                    disabled={checkedTasks.size}
                >Add task</button>
            </div>
            <div className={styles.pageControls}>
                {<button onClick={handleToggleShowCofirmModal}
                    disabled={!checkedTasks.size}
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
                                style={todo.importance === "High" ? { backgroundColor: "rgb(255, 112, 112)" } : todo.importance === "Medium" ? { backgroundColor: "rgb(209, 112, 255)" } : { backgroundColor: "rgb(112, 203, 255)" }}>
                                <SingleTodo todo={todo}
                                    handleCheckedTasks={handleCheckedTasks}
                                    handleEditTask={handleEditTask}
                                />
                            </div>
                        )
                    }))
                }
            </div>
            {toggleConfirmModal && <RemoveCheckedTaskModal
                count={checkedTasks.size}
                handleRemovedCheckedTasks={handleRemovedCheckedTasks}
                handleToggleShowCofirmModal={handleToggleShowCofirmModal}
            />}
            {showEditTaskModal && <EditTaskModal
                editTaskObj={editTask}
                handleEditTaskModal={handleEditTaskModal}
            />}
        </>
    )
}