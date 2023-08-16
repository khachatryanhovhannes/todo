import styles from "./RemoveCheckedTaskModal.module.css"
import { useSelector, useDispatch } from "react-redux"
import { getAllTasks, clearCheckedTasks } from "../../../redux/reducer/reducer"
import { useRemoveCheckedTasksMutation } from "../../../redux/API/API"


export default function RemoveCheckedTaskModal({ handleToggleShowCofirmModal }) {
    const checkedTasks = useSelector((state) => state.taskReducer.checkedTasks)
    const [deleteMultipleTask, response] = useRemoveCheckedTasksMutation()
    const toDoList = useSelector((state) => state.taskReducer.toDoList)
    const dispatch = useDispatch()

    function handleRemoveChackedTask() {
        let newToDoList = [...toDoList]
        deleteMultipleTask(checkedTasks)
        handleToggleShowCofirmModal()
        checkedTasks.forEach(id => {
            newToDoList = newToDoList.filter(todo => todo.id !== id)
        });
        dispatch(getAllTasks(newToDoList))
        dispatch(clearCheckedTasks())
    }

    return (
        <div className={styles.removeCheckedTaskModalBack} onClick={handleToggleShowCofirmModal}>
            <div className={styles.removeCheckedTaskModal} onClick={(evt) => {
                evt.stopPropagation()
            }}>
                <h1>Are you sure to remove {checkedTasks.length} count of tasks ?</h1>
                <div className={styles.buttons}>
                    <button onClick={handleRemoveChackedTask}>Confirm</button>
                    <button onClick={handleToggleShowCofirmModal}>Close</button>
                </div>

            </div>
        </div>
    )
}