import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getSingleTask, removeSingleTask, saveEditTask} from '../../../utils/API';
import { useNavigate } from 'react-router-dom';
import EditTaskModal from "../../modals/editTaskModal/EditTaskModal"
import styles from "./SingleTask.module.css"

export default function SingleTask() {
    const { id } = useParams();
    const [showEditModal, setShowEditModal] = useState(false)
    const [taskData, setTaskData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getSingleTask(id)
            .then(response => {
                if (!response.ok) {
                    throw response.error
                }
                return response.json()
            })
            .then(task => {
                console.log('DDDDDD====>>>>', task);

                setTaskData({
                    ...taskData,
                    ...task
                })

            })
            .catch(error => console.log(error))
    }, [])

    function handleRemoveSingleTask(taskId) {
        removeSingleTask(taskId)
            .then(response => {
                if (!response.ok) {
                    throw response.error
                }
                return response.json()
            })
            .then(navigate('/'))
            .catch(error => console.log(error))
    }

    function handleEditTaskModal() {
        setShowEditModal(!showEditModal)
    }


    function handleSaveEditedTask(taskObj){
        saveEditTask(taskObj)
            .then(response => {
                if (!response.ok) {
                    throw response.error
                }
                return response.json()
            })
            .then(task => {
                setTaskData(task)
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