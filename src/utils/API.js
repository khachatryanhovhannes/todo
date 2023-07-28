const REACT_APP_URL_API = process.env.REACT_APP_URL_API;

async function getAllTasks() {
    return await fetch(`${REACT_APP_URL_API}/tasks`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
}

async function addTask(newTask) {
    return await fetch(`${REACT_APP_URL_API}/tasks`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask)
    })
}

async function removeSingleTask(taskId) {
    return await fetch(`${REACT_APP_URL_API}/tasks/${taskId}`, {
        method: 'DELETE',
    })
}

async function saveEditTask(taskObj){
    return await fetch(`${REACT_APP_URL_API}/tasks/${taskObj.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskObj)
    })
}


async function getSingleTask(id){
    return await fetch(`${REACT_APP_URL_API}/tasks/${id}`, {
        method: 'GET',
    })
}

export { getAllTasks, addTask, removeSingleTask,saveEditTask, getSingleTask}