import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { saveEditTask } from '../../../utils/API';
import { useNavigate } from 'react-router-dom';
import EditTaskModal from "../../modals/editTaskModal/EditTaskModal"
import styles from "./SingleTask.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { removeSingleTask } from '../../../redux/reducer/reducer';
import { useDeleteTaskMutation } from '../../../redux/API/API';

export default function SingleTask() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const taskData =  useSelector((state)=>{
        return state.taskReducer.toDoList.find((item)=>item.id == id)
    })
    const [deleteTask, result] = useDeleteTaskMutation()

    const [showEditModal, setShowEditModal] = useState(false)
    const navigate = useNavigate();


    function handleRemoveSingleTask(taskId) {
        deleteTask({ taskId })
        .then(() => {
            dispatch(removeSingleTask(taskId))
            navigate('/')
        })
    }

    function handleEditTaskModal() {
        setShowEditModal(!showEditModal)
    }


    function handleSaveEditedTask(taskObj) {
        saveEditTask(taskObj)
            .then(response => {
                if (!response.ok) {
                    throw response.error
                }
                return response.json()
            })
            .then(task => {
                // setTaskData(task)
                handleEditTaskModal()
            })
            .catch(error => console.log(error))
    }

    return (
        <div className={styles.singleTaskBack}>
            <input type="button"
                value="Back"
                className={styles.backButton}
                onClick={(evt) => {
                    evt.preventDefault()
                    navigate('/')
                }} />
            {
                taskData &&
                <div className={styles.singleTask}>
                    <h1>{taskData.title}</h1>
                    <h2>Developer - {taskData.developer}</h2>
                    <h3>Importance - {taskData.importance}</h3>
                    <p>{taskData.description}</p>
                    <button
                        className={styles.editButton}
                        onClick={handleEditTaskModal}
                    > Edit this task
                    </button>
                    <button
                        className={styles.removeButton}
                        onClick={() => {
                            handleRemoveSingleTask(taskData.id)
                        }}
                    >Remove this task</button>
                </div>
            }
            {showEditModal && <EditTaskModal
                editTask={taskData}
                handleEditTaskModal={handleEditTaskModal}
                handleSaveEditedTask={handleSaveEditedTask}
            />}

        </div>
    )
}