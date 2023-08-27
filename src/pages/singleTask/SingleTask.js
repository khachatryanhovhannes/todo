import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditTaskModal from "../../componenets/modals/editTaskModal/EditTaskModal"
import styles from "./SingleTask.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { removeSingleTask, getTaskInfoInEditModal } from '../../redux/reducer/reducer';
import { useDeleteTaskMutation, useGetSingleTaskQuery } from '../../redux/API/API';
import { showErrorMessage, showSuccesMessage } from '../../utils/utils';
import Loading from "../../componenets/loading/Loading"


export default function SingleTask() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const [taskData, setTaskData] = useState({})
    const [deleteTask, result] = useDeleteTaskMutation()
    const navigate = useNavigate();
    const editTaskObj = useSelector((state) => state.taskReducer.editTaskObj)
    const { data, error, isLoading } = useGetSingleTaskQuery(id)

    useEffect(() => {

        if (data) {
            setTaskData(data)
        }
    }, [data])


    function handleRemoveSingleTask(taskId) {
        deleteTask(taskId)
            .then(() => {
                dispatch(removeSingleTask(taskId))
                showSuccesMessage()
                navigate('/')
            })
            .catch(() => {
                showErrorMessage()
            })
    }


    function handleEditTask(taskData) {
        dispatch(getTaskInfoInEditModal(taskData))
    }

    console.log(taskData)
    return (
        <div className={styles.singleTaskBack}>

            {
                isLoading ? <div className={styles.loading}> <Loading /> </div> :
                    Object.keys(taskData).length ? (
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
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleEditTask(taskData)
                                }}
                            > Edit this task
                            </button>
                            <button
                                className={styles.removeButton}
                                onClick={() => {
                                    handleRemoveSingleTask(taskData.id)
                                }}
                            >Remove this task</button>
                        </div>) : null
            }
            {Object.keys(editTaskObj).length ? <EditTaskModal /> : null}

        </div>
    )
}