import { useState, useEffect } from "react";
import { addTask, removeSingleTask, saveEditTask } from "../../../utils/API";
import AddTaskModal from "../../modals/addTaskModal/AddTaskModal";
import styles from "./todo.module.css"
import SingleTodo from "./singleTodo/SingleTodo";
import RemoveCheckedTaskModal from "../../modals/removeCheckedTaskModal/RemoveCheckedTaskModal";
import EditTaskModal from "../../modals/editTaskModal/EditTaskModal";
import { useGetAllTasksQuery } from "../../../redux/API/API";
import { useSelector , useDispatch} from "react-redux";
import { getAllTasks } from "../../../redux/reducer/reducer";



export default function Todo() {
    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetAllTasksQuery("GET")
    const toDoList = useSelector((state)=>state.taskReducer.toDoList)


    const [editTask, setEditTask] = useState(null)
    const [showEditTaskModal, setShowEditTaskModal] = useState(false)
    let [checkedTasks, setCheckedTasks] = useState(new Set())
    const [toggleConfirmModal, setToggleConfirmModal] = useState(false)
    const [showNewTaskModal, setShowNewTaskModal] = useState(false)


    // useEffect(() => {
    //     getAllTasks()
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw response.error
    //             }
    //             return response.json()
    //         })
    //         .then(tasks => {
    //             let newToDoList = [...toDoList, ...tasks];
    //             setToDoList(newToDoList)
    //         })
    //         .catch(error => console.log(error))

    // }, [])

    useEffect(() => {
        if (data) {
            dispatch(getAllTasks(data))
        }
    }, [data])


    function handleShowAddModal() {
        setShowNewTaskModal(!showNewTaskModal)
    }

    function handleSendAddTask(newTaskObj) {
        // addTask(newTaskObj)
        //     .then(response => {
        //         if (!response.ok) {
        //             throw response.error
        //         }
        //         return response.json()
        //     })
        //     .then(task => {
        //         let newToDoList = [...toDoList, task];
        //         setToDoList(newToDoList)
        //     })
        //     .catch(error => console.log(error))

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
            removeSingleTask(itemId)
                .then(response => {
                    if (!response.ok) {
                        throw response.error
                    }
                    return response.json()
                }).then(() => {
                    toDoList = toDoList.filter(item => item.id !== itemId)
                })
        })
        checkedTasks = checkedTasks.clear
        setCheckedTasks(checkedTasks.clear)
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

    function handleSaveEditedTask(taskObj) {
        let toDo = toDoList;
        console.log(taskObj)
        saveEditTask(taskObj)
            .then(response => {
                if (!response.ok) {
                    throw response.error
                }
                return response.json()
            })
            .then(task => {
                let index = toDo.findIndex((item) => item.id === taskObj.id);
                toDo[index] = {
                    ...toDo[index],
                    ...taskObj
                }
                // setToDoList([...toDo])
                setEditTask(null)
                setShowEditTaskModal(false)
                console.log(task)
            })
            .catch(error => console.log(error))
    }


    return (
        <>
            <div className={styles.addButton}>
                <button onClick={handleShowAddModal}>Add task</button>
            </div>
            <div className={styles.pageControls}>
                { <button onClick={handleToggleShowCofirmModal}>Remove checked tasks</button> }
            </div>
            {showNewTaskModal && <AddTaskModal
                handleShowAddModal={handleShowAddModal}
                // handleSendAddTask={handleSendAddTask}
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
                                    // handleRemoveSingleTask={handleRemoveSingleTask}
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
                editTask={editTask}
                handleEditTaskModal={handleEditTaskModal}
                handleSaveEditedTask={handleSaveEditedTask}
            />}
        </>
    )
}