import { useState } from "react"
import styles from "./EditTaskModal.module.css"
import { useUpdateTaskMutation } from "../../../redux/API/API"
import { useDispatch } from "react-redux"
import { editTask } from "../../../redux/reducer/reducer"


export default function EditTaskModal({ editTaskObj, handleEditTaskModal }) {
    const [sendEditTask, isLoading] = useUpdateTaskMutation()
    const dispatch = useDispatch()
    const [newTaskObj, setNewTaskObj] = useState(editTaskObj)

    function handleInputChange(event) {
        setNewTaskObj({ ...newTaskObj, [event.target.name]: event.target.value })
    }

    function handleSelectChange(event) {
        setNewTaskObj({ ...newTaskObj, developer: event.target.value })
    }

    function handleRadioChange(event) {
        setNewTaskObj({ ...newTaskObj, importance: event.target.title })
    }

    function handleAddEditedTask(event) {
        event.preventDefault();

        
        const { id, title, description, importance, developer } = newTaskObj;
        if (!title || !description || !importance || !developer) {
            return;
        }
        sendEditTask({id, title, description, importance, developer})
            .then((res) => {
                console.log(res)
                dispatch(editTask({id, title, description, importance, developer}))
                handleEditTaskModal()
            })
    }

    function handleAddKeyDown(event) {
        if (event.key === "Enter") {
            handleAddEditedTask(event)
        }

    }

    return (
        <div className={styles.addTaskModalBack} onClick={handleEditTaskModal}>
            <form onKeyDown={handleAddKeyDown} onClick={(evt) => {
                evt.stopPropagation()
            }}>
                <div className={styles.formHeader}>
                    <h3>EDIT TASK</h3>
                    <button onClick={handleEditTaskModal}>&#10005;</button>
                </div>
                <div className={styles.labelInput}>
                    <label>Title</label>
                    <input type="text"
                        placeholder="Title"
                        name="title"
                        value={newTaskObj.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.labelInput}>
                    <label>Description</label>
                    <textarea placeholder="Description"
                        name="description"
                        value={newTaskObj.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className={styles.labelInput}>
                    <label>Developer</label>
                    <select value={newTaskObj.developer} onChange={handleSelectChange}>
                        <option value="Micky Mouse">Micky Mouse</option>
                        <option value="Spider Man">Spider Man</option>
                        <option value="Tom and Jerry">Tom and Jerry</option>
                    </select>
                </div>
                <div className={styles.labelInput}>
                    <label>Importance</label>
                    <div className={styles.radios}>
                        <label>
                            <input type="radio"
                                name="radios"
                                title="Low"
                                onChange={handleRadioChange}
                                checked={newTaskObj.importance === "Low" ? true : false}
                            />
                            Low
                        </label>
                        <br />
                        <label>
                            <input type="radio"
                                name="radios"
                                title="Medium"
                                onChange={handleRadioChange}
                                checked={newTaskObj.importance === "Medium" ? true : false}
                            />
                            Medium
                        </label>
                        <br />

                        <label>
                            <input type="radio"
                                name="radios"
                                title="High"
                                onChange={handleRadioChange}
                                checked={newTaskObj.importance === "High" ? true : false}
                            />
                            High
                        </label>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <input type="submit" value="Edit" onClick={handleAddEditedTask} />
                    <button onClick={handleEditTaskModal}>Cancel</button>
                </div>
            </form>
        </div>
    )
}