import { useParams } from 'react-router';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditTaskModal from "../../componenets/modals/editTaskModal/EditTaskModal"
import styles from "./SingleTask.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { removeSingleTask } from '../../redux/reducer/reducer';
import { useDeleteTaskMutation } from '../../redux/API/API';
import { showErrorMessage, showSuccesMessage } from '../../componenets/Toastify/Toastify';

export default function SingleTask() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const taskData = useSelector((state) => {
        return state.taskReducer.toDoList.find((item) => item.id == id)
    })
    const [deleteTask, result] = useDeleteTaskMutation()
    const [showEditModal, setShowEditModal] = useState(false)
    const navigate = useNavigate();
  
    function handleRemoveSingleTask(taskId) {
        deleteTask(taskId)
            .then(() => {
                dispatch(removeSingleTask(taskId))
                showSuccesMessage()
                navigate('/')
            })
            .catch(()=>{
                showErrorMessage()
            })
    }

    function handleEditTaskModal() {
        setShowEditModal(!showEditModal)
    }

    return (
        <div className={styles.singleTaskBack}>
            {
                taskData &&
                <div className={styles.singleTask}>
                    <div>
                        <input type="button"
                            value="Back"
                            className={styles.backButton}
                            onClick={(evt) => {
                                evt.preventDefault()
                                navigate('/')
                            }} />
                    </div>

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
            {
                showEditModal && <EditTaskModal
                    editTaskObj={taskData}
                />}
        </div>
    )
}