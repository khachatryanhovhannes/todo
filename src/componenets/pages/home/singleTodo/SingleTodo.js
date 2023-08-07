import styles from "./SingleTodo.module.css"
import { FaTrash, FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useDeleteTaskMutation } from "../../../../redux/API/API";
import { removeSingleTask } from "../../../../redux/reducer/reducer";
import { useDispatch } from "react-redux";

export default function SingleTodo({ todo, handleCheckedTasks, handleEditTask }) {
    const dispatch = useDispatch()
    const [deleteTask, result] = useDeleteTaskMutation()


    function handleRemoveSingleTask(taskId) {
        deleteTask({ taskId }).then(() => {
            dispatch(removeSingleTask(taskId))
        })
    }
    return (
        <>
            <div className={styles.checkbox}>
                <input type="checkbox"
                    onChange={() => {
                        handleCheckedTasks(todo.id)
                    }}
                />
            </div>
            <Link
                to={`/task/${todo.id}`}
                className={styles.todoTitle}
            >{todo.title}</Link>
            <h2 className={styles.todoDev}>{todo.developer}</h2>
            <h3 className={styles.todoImp}>Importance - {todo.importance}</h3>
            <p className={styles.todoDesc}>{todo.description}</p>
            <div className={styles.controls}>
                <button className={styles.trash}
                    onClick={() => {
                        handleRemoveSingleTask(todo.id)
                    }}
                ><FaTrash /></button>
                <button className={styles.edit}
                    onClick={() => {
                        handleEditTask(todo)
                    }}
                ><FaEdit /></button>
            </div>
        </>
    )
}