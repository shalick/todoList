export const SET_TASKS = "SET-TASKS";
export const UPDATE_TASK = "UPDATE-TASK";
export const SET_TODOLISTS = "SET-TODOLISTS";
export const ADD_TASK = "ADD-TASK";
export const DELETE_TASK = "DELETE_TASK";
export const DELETE_TODOLIST = "DELETE_TODOLIST";
export const ADD_TODOLIST = "ADD_TODOLIST";


const initialState = {
    tasks: [],
    todolists: []
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TASK:
            let newTasks = state.tasks.map(t => {
                if (t.id != action.task.id) {
                    return t;
                } else {
                    return action.task;
                }
            });
            return {...state, tasks: newTasks}
            break;
        case SET_TASKS:
            return {
                ...state,
                tasks: [...state.tasks, ...action.tasks]
            }
            break;
        case ADD_TODOLIST:
            let newTodolistsArray = [...state.todolists, action.newTodolist]
            return {
                ...state, tasks: newTodolistsArray
            }
            break
        case ADD_TASK:
            debugger
            let newTasksArray = [...state.tasks, action.newTask]
            return {
                ...state, tasks: newTasksArray
            }
            break;
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists
            }
            break;
        case SET_TASKS:
            return {
                ...state,
                tasks: [...state.tasks, ...action.tasks]
            }
            break;
        case DELETE_TASK:
            break;
        case DELETE_TODOLIST:
            break;
        default:
            return state;
    }
    // if (action.type === UPDATE_TASK) {
    //     let newTasks = state.tasks.map(t => {
    //         if (t.id != action.task.id) {
    //             return t;
    //         } else {
    //             return action.task;
    //         }
    //     });
    //     return {...state, tasks: newTasks}
    // }
    // if (action.type === SET_TASKS) {
    //     return {
    //         ...state,
    //         tasks: [...state.tasks, ...action.tasks]
    //     }
    // }
    //
    // if (action.type === ADD_TASK) {
    //     let newTasksArray = [...state.tasks, action.newTask]
    //     return {
    //         ...state, tasks: newTasksArray
    //     }
    // }
    //
    // if (action.type === SET_TODOLISTS) {
    //     return {
    //         ...state,
    //         todolists: action.todolists
    //     }
    // }
    //
    // if (action.type === SET_TASKS) {
    //     return {
    //         ...state,
    //         tasks: [...state.tasks, ...action.tasks]
    //     }
    // }
    //
    // if (action.type === DELETE_TASK) {
    //     return {
    //
    //     }
    // }
    // if (action.type === DELETE_TODOLIST) {
    //     return {
    //
    //     }
    // }
    // return state;
};


// export const setTaskAC = (tasks) => {
//     let action = {
//         type: SET_TASKS,
//         tasks: tasks
//     }
//     return action
// }

export const setTaskAC = (tasks) => ({type: SET_TASKS, tasks});
export const updateTaskAC = (updateTask) => ({type: UPDATE_TASK, task: updateTask});
export const setTodolistsAC = (todolists) => ({type: SET_TODOLISTS, todolists});
export const addTaskAC = (newTask) => ({type: ADD_TASK, newTask});
export const addTodolistAC = (todolist) => ({type: ADD_TODOLIST, todolist});
export const deleteTodolistAC = (todolist) => ({type: DELETE_TODOLIST, todolist});

export default reducer;