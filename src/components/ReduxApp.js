import * as React from "react";
import connect from "react-redux/es/connect/connect";
import {todolistAPI} from "../api";
import AddNewItemForm from "../AddNewItemForm";
import ReduxTodoList from "./ReduxTodoList";
import {addTodolistAC, deleteTodolistAC, setTodolistsAC} from "../redux/reducer";

const ReduxAppView = (props) => {
   return (<div>
       {/*<AddNewItemForm addItem={(title)=>{props.addTask(title)}}/>*/}
       <AddNewItemForm addItem={props.addTodolist}/>

       {props.todolists.map(tl => {

           return <ReduxTodoList id={tl.id} title={tl.title}
                                 tasks={props.tasks.filter(t => {

                                     return t.todoListId === tl.id
                                 })}/>
       }) }
   </div>)
}


class ReduxApp extends React.Component {

    componentDidMount() {
        todolistAPI.getTotolists()
            .then(res => {
                 this.props.setTodolists(res.data);
            });
    }

    render() {
        // let {setTodolists, ...restProps} = this.props;
        return <ReduxAppView {...this.props} addTodolist={this.addTodolist} deleteTodoList={this.deleteTodolist}/>
    }

    addTodolist = (todolistTitle) => {

        todolistAPI.createTodolist(todolistTitle)
            .then( res => {
                this.props.addTodolist(res.data.data.item)
            } )
    }



    // render() {
    //     return <div>
    //         <AddNewItemForm addItem={this.props.addTask}/>
    //         <ul>
    //             {this.props.tasks.map(t => <li>{t.title}</li>)}
    //         </ul>
    //     </div>
        // debugger
        // return <div>
        //     <ul>
        //         {this.props.tasks.map(t => <li>{t.title}</li>)}
        //     </ul>
        // </div>
    // }

}

let mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        todolists : state.todolists
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setTodolists: (todolists) => {
            dispatch(setTodolistsAC(todolists));
        },
        addTodolist: (todolist) => {
            // let action = {
            //     type: "ADD_TODOLIST",
            //     todolist
            // }
            dispatch(addTodolistAC(todolist));
        },

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxApp);
