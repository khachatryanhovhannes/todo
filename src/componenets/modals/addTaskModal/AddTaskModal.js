import { useState, useRef, useEffect } from "react"
import styles from "./AddTaskModal.module.css"
import { useAddTaskMutation } from "../../../redux/API/API"
import { addTask } from "../../../redux/reducer/reducer"
import { useDispatch } from "react-redux"
import { showErrorMessage, showSuccesMessage } from "../../../utils/utils"


export default function AddTaskModal({ handleShowAddModal }) {
    const [sendTaskData, result] = useAddTaskMutation()
    const dispatch = useDispatch()
    const inputRef = useRef("")





    const [newTaskObj, setNewTaskObj] = useState({
        title: null,
        description: null,
        importance: null,
        developer: null
    })


    useEffect(() => {
        handleInputFocus()
    }, [])


    function handleInputFocus() {
        inputRef.current.focus()
    }

    function handleInputChange(event) {
        setNewTaskObj({ ...newTaskObj, [event.target.name]: event.target.value })
    }

    function handleSelectChange(event) {
        setNewTaskObj({ ...newTaskObj, developer: event.target.value })
    }

    function handleRadioChange(event) {
        setNewTaskObj({ ...newTaskObj, importance: event.target.title })
    }

    function handleAddTask(event) {
        event.preventDefault();


        const { title, description, importance, developer } = newTaskObj;
        if (!title || !description || !importance || !developer) {
            return;
        }
        sendTaskData(newTaskObj)
            .then((taskObj) => {
                dispatch(addTask(taskObj.data))
                handleShowAddModal()
                showSuccesMessage()
            })
            .catch(()=>{
                showErrorMessage()
            })
    }

    function handleAddKeyDown(event) {
        if (event.key === "Enter") {
            handleAddTask(event)
        }

    }

    return (
        <div className={styles.addTaskModalBack}
            onClick={handleShowAddModal}>
            <form onKeyDown={handleAddKeyDown}
                onClick={(evt) => {
                    evt.stopPropagation()
                }}>
                <div className={styles.formHeader}>
                    <h3>ADD NEW TASK</h3>
                    <button onClick={handleShowAddModal}>&#10005;</button>
                </div>
                <div className={styles.labelInput}>
                    <label>Title</label>
                    <input type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleInputChange}
                        ref={inputRef}
                    />
                </div>
                <div className={styles.labelInput}>
                    <label>Description</label>
                    <textarea placeholder="Description"
                        name="description"
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className={styles.labelInput}>
                    <label>Developer</label>
                    <select onChange={handleSelectChange}>
                        <option value="">Select developer</option>
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
                            />
                            Low
                        </label>
                        <br />
                        <label>
                            <input type="radio"
                                name="radios"
                                title="Medium"
                                onChange={handleRadioChange}
                            />
                            Medium
                        </label>
                        <br />

                        <label>
                            <input type="radio"
                                name="radios"
                                title="High"
                                onChange={handleRadioChange}
                            />
                            High
                        </label>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <input type="submit" value="Add" onClick={handleAddTask} />
                    <button onClick={(ect) => {
                        handleShowAddModal()
                    }}>Cancel</button>

                    <div>
                    </div>
                </div>
            </form>
        </div>
    )
}


