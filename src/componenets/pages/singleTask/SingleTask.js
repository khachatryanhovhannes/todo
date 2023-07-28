import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getSingleTask, removeSingleTask } from '../../../utils/API';
import { useNavigate } from 'react-router-dom';
import styles from "./SingleTask.module.css"

export default function SingleTask() {
    const { id } = useParams();
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



    return (
        <div className={styles.singleTaskBack}>
            <input type="button" value="Back" onClick={(evt)=>{
                evt.preventDefault()
                navigate('/')
            }}/>
            {
                taskData &&
                <div className={styles.singleTask}>
                    <h1>{taskData.title}</h1>
                    <h2>Developer - {taskData.developer}</h2>
                    <h3>Importance - {taskData.importance}</h3>
                    <p>{taskData.description}</p>
                    <button
                        onClick={()=>{
                            handleRemoveSingleTask(taskData.id)
                        }}
                    >Remove this task</button>
                </div>
            }


        </div>
    )
}