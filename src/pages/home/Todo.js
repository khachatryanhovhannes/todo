import { useState, useEffect } from "react";
import AddTaskModal from "../../componenets/modals/addTaskModal/AddTaskModal";
import styles from "./todo.module.css"
import SingleTodo from "./singleTodo/SingleTodo";
import RemoveCheckedTaskModal from "../../componenets/modals/removeCheckedTaskModal/RemoveCheckedTaskModal";
import EditTaskModal from "../../componenets/modals/editTaskModal/EditTaskModal";
import { useGetAllTasksQuery, useSearchTaskQuery } from "../../redux/API/API";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks } from "../../redux/reducer/reducer";
import Loading from "../../componenets/loading/Loading";
import { useDebounce } from "../../customHooks/customHooks";
import SearchResult from "../../componenets/searchResult/SearchResult";
import { useNavigate } from "react-router-dom";

export default function Todo() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetAllTasksQuery()
    const toDoList = useSelector((state) => state.taskReducer.toDoList)
    const editTaskObj = useSelector((state) => state.taskReducer.editTaskObj)
    const checkedTasks = useSelector((state) => state.taskReducer.checkedTasks)
    const [toggleConfirmModal, setToggleConfirmModal] = useState(false)
    const [showNewTaskModal, setShowNewTaskModal] = useState(false)

    const [searchText, setSearchText] = useState('');
    const debounced = useDebounce(searchText)
    const { data: searchResults } = useSearchTaskQuery(debounced);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value)
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === null) {
            navigate('/signIn')
        }
    }, [])

    useEffect(() => {
        if (data) {
            dispatch(getAllTasks(data))
        }
    }, [data])


    function handleShowAddModal() {
        setShowNewTaskModal(!showNewTaskModal)
    }

    function handleToggleShowCofirmModal() {
        setToggleConfirmModal(!toggleConfirmModal)
    }

    return (
        <>
            <div className={styles.pageControls}>
                <button onClick={handleToggleShowCofirmModal}
                    disabled={!checkedTasks.length}
                >Remove checked tasks</button>

                <div className={styles.addButton}>
                    <button onClick={handleShowAddModal}
                        disabled={checkedTasks.length}
                    >Add task</button>
                </div>
                <div>
                    <input type="search"
                        placeholder="Search..."
                        value={searchText}
                        onChange={handleSearchChange}
                    /><div className={styles.searchingResult}>
                        {
                            searchResults && <SearchResult searchResults={searchResults} />
                        }
                    </div>
                </div>

            </div>
            {showNewTaskModal ? <AddTaskModal
                handleShowAddModal={handleShowAddModal}
            /> : null}
            <div className={styles.drawTodoList}>
                {
                    isLoading ? <Loading /> : null
                }

                {
                    toDoList ? toDoList.map((todo => {
                        return (
                            <div className={styles.singleTodo}
                                key={todo.id}
                                style={todo.importance === "High" ? { backgroundColor: "rgb(255 181 181)" } : todo.importance === "Medium" ? { backgroundColor: "rgb(232 185 255)" } : { backgroundColor: "rgb(197 234 255)" }}>
                                <SingleTodo todo={todo} />
                            </div>
                        )
                    })) : null
                }
            </div>
            {toggleConfirmModal && <RemoveCheckedTaskModal
                handleToggleShowCofirmModal={handleToggleShowCofirmModal}
            />}
            {Object.keys(editTaskObj).length ? <EditTaskModal /> : null}
        </>
    )
}