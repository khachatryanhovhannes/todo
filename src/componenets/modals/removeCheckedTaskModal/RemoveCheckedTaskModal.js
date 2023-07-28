import styles from "./RemoveCheckedTaskModal.module.css"

export default function RemoveCheckedTaskModal({ count, handleRemovedCheckedTasks, handleToggleShowCofirmModal }) {
    return (
        <div className={styles.removeCheckedTaskModalBack} onClick={handleToggleShowCofirmModal}>
            <div className={styles.removeCheckedTaskModal} onClick={(evt)=>{
                evt.stopPropagation()
            }}>
                <h1>Are you sure to remove {count} count of tasks ?</h1>
                <div className={styles.buttons}>
                    <button onClick={handleRemovedCheckedTasks}>Confirm</button>
                    <button onClick={handleToggleShowCofirmModal}>Close</button>
                </div>

            </div>
        </div>
    )
}