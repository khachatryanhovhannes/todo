import { useState } from "react"
import styles from "./AddTaskModal.module.css"


export default function AddTaskModal({ handleShowAddModal, handleSendAddTask }) {
    const [newTaskObj, setNewTaskObj] = useState({
        title: null,
        description: null,
        importance: null,
        developer: null
    })

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
        handleSendAddTask(newTaskObj);
        handleShowAddModal()
    }

    function handleAddKeyDown(event) {
        if (event.key === "Enter") {
            handleAddTask(event)
        }

    }

    return (
        <div className={styles.addTaskModalBack} onClick={handleShowAddModal}>
            <form onKeyDown={handleAddKeyDown} onClick={(evt)=>{
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
                    <button onClick={handleShowAddModal}>Cancel</button>
                </div>
            </form>
        </div>
    )
}


