import React from 'react';
import '../App.css';
import TodoListTasks from "../TodoListTasks";
import TodoListFooter from "../TodoListFooter";
import TodoListTitle from "../TodoListTitle";
import AddNewItemForm from "../AddNewItemForm";
import instance, {todolistAPI} from "../api";
import preloader from "../preloader.svg";
import connect from "react-redux/es/connect/connect";
import {addTaskAC, deleteTodolistAC, setTaskAC, updateTaskAC} from "../redux/reducer";

const ReduxTodoListView = (props) => {
    return (
        <div className="todoList">
            <div className="todoList-header">
                <TodoListTitle title={props.title} id={props.id} deleteTodolist={props.deleteTodolist}/>
                <AddNewItemForm addItem={props.addTask}/>
            </div>

            {props.isFetching
                ? <img src={preloader}/>
                : <TodoListTasks changeStatus={props.changeStatus}
                                 changeTitle={props.changeTitle}
                                 tasks={props.tasks.filter(t => {
                                     if (props.filterValue === "All") {
                                         return true;
                                     }
                                     if (props.filterValue === "Active") {
                                         return t.status !== 2;
                                     }
                                     if (props.filterValue === "Completed") {
                                         return t.status === 2;
                                     }
                                 })}/>
            }
            <TodoListFooter changeFilter={props.changeFilter} filterValue={props.filterValue}/>
        </div>

    );
}

class ReduxTodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();

    }

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        // переводим объект в строку
        let stateAsString = JSON.stringify(this.state);
        // сохраняем нашу строку в localStorage под ключом "our-state"
        localStorage.setItem("our-state-" + this.props.id, stateAsString);
    }

    restoreState = () => {
        this.setState({isFetching: true});
        todolistAPI.getTasks(this.props.id)
            .then(res => {

                this.setState({isFetching: false});
                this.props.setTasks(res.data.items);
                //this.setState( {tasks: res.data.items });
            });
    }

    state = {
        filterValue: "All",
        isFetching: false
    };

    addTask = (newText) => {

        todolistAPI.createTask(this.props.id, newText)
            .then(res => {

                this.props.addTask(res.data.data.item);
            });

    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState();
        });
    }

    changeTask = (taskId, obj) => {

        let task = this.props.tasks.find(t => t.id === taskId);
        let newTask = {...task, ...obj};
        todolistAPI.updateTask(newTask)
            .then( res => {

                this.props.updateTask(newTask)
            })
    }


    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status});
    }
    changeTitle = (taskId, title) => {

        this.changeTask(taskId, {title: title});
    }

    deleteTodolist = (todolist) => {debugger
        todolistAPI.deleteTodoList(todolist)
            .then(res => {
                let result=res
                debugger

            })
    }

    render = () => {
        return <ReduxTodoListView {...this.props}
                                  deleteTodolist = {this.deleteTodolist}
                                  isFetching = {this.state.isFetching}
                                  filterValue = {this.state.filterValue}
                                  addTask = {this.addTask}
                                  changeFilter = {this.changeFilter}
                                  changeTask = {this.changeTask}
                                  changeTitle={this.changeTitle}

        />
    }


}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
    return {
        setTasks: (tasks) => {
            dispatch(setTaskAC(tasks))
        },
        updateTask: (updateTask) => {
            dispatch(updateTaskAC(updateTask));
        },
        addTask: (task) => {
            dispatch(addTaskAC(task));
        },
        deleteTodoList: (todolists) => {
            dispatch(deleteTodolistAC(todolists));
        }

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ReduxTodoList);


