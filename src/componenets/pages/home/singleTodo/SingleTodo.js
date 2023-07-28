import styles from "./SingleTodo.module.css"
import { FaTrash, FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom';

export default function SingleTodo({ todo, handleRemoveSingleTask, handleCheckedTasks, handleEditTask }) {
    return (
        <>
            <div className={styles.checkbox}>
                <input type="checkbox"
                    onChange={() => {
                        handleCheckedTasks(todo.id)
                    }}
                />
            </div>
            <h1><Link to={`/task/${todo.id}`}>{todo.title}</Link></h1>
            <h2>{todo.developer}</h2>
            <h3>{todo.importance}</h3>
            <p>{todo.description}</p>
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