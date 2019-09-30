import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '0b4c9d99-4017-4d76-b45f-244e10114212'}
});


export const todolistAPI = {
    createTodolist(title) {

        return instance.post("todo-lists", {title: title});
    },
    getTotolists() {
        return instance.get("todo-lists");
    },
    getTasks(todolistId) {
        return instance.get(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId, title) {
        return instance.post(`todo-lists/${todolistId}/tasks`,
            {title: title});
    },
    updateTask(task) {
        return instance.put(`todo-lists/tasks`, task);
    },
    deleteTodoList(todolistId) {
        return instance.delete(`todo-lists/${todolistId}`);
    },
    deleteTask(taskId){
        return instance.delete(`todo-lists/task/${taskId}`);
    }
}

export default instance;