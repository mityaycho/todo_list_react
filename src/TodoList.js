import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, deleteTaskAC, deleteTodolistAC, setTasksAC, setTodoListAC, updateTaskAC} from "./reducer";
import axios from "axios";


class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();

    }

    componentDidMount() {
        this.restoreState();
    }

    // saveState = () => {
    //     // переводим объект в строку
    //     let stateAsString = JSON.stringify(this.state);
    //     // сохраняем нашу строку в localStorage под ключом "our-state"
    //     localStorage.setItem("our-state-" + this.props.id, stateAsString);
    // }

    restoreState = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}/tasks`,
          {withCredentials: true, headers: {"API-KEY": "5ac078f7-4935-4223-bad6-63f58b80cd23"}})
          .then(res => {
              console.log(res.data);
              this.props.setTasks(res.data.items, this.props.id)
          });
    };

    __restoreState = () => {
        // объявляем наш стейт стартовый
        let state = this.state;
        // считываем сохранённую ранее строку из localStorage
        let stateAsString = localStorage.getItem("our-state-" + this.props.id);
        // а вдруг ещё не было ни одного сохранения?? тогда будет null.
        // если не null, тогда превращаем строку в объект
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        // устанавливаем стейт (либо пустой, либо восстановленный) в стейт
        this.setState(state, () => {
            this.state.tasks.forEach(t => {
                if (t.id >= this.nextTaskId) {
                    this.nextTaskId = t.id + 1;
                }
            })
        });
    };

    nextTaskId = 0;

    state = {
        tasks: [],
        filterValue: "All"
    };

    addTask = (newText) => {
        // let newTask = {
        //     id: this.nextTaskId,
        //     title: newText,
        //     isDone: false,
        //     priority: "low"
        // };
        // инкрементим (увеличим) id следующей таски, чтобы при следюущем добавлении, он был на 1 больше
        this.nextTaskId++;
       /* let newTasks = [...this.state.tasks, newTask];
        this.setState( {
            tasks: newTasks
        }, () => { this.saveState(); });*/
       // this.props.addTask(newTask, this.props.id);

        axios.post(`https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}/tasks`,
          {title: newText},
          {withCredentials: true, headers: {"API-KEY": "5ac078f7-4935-4223-bad6-63f58b80cd23"}})
          .then(res => {
              this.props.addTask(res.data.data.item, this.props.id)
          });
    };

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        });
    };

    changeTask = (task) => {
        this.updateTask(task);
    };

    changeStatus = (task) => {
        this.changeTask(task);
    };

    changeTitle = (task) => {
        this.updateTask(task);
    };

    deleteTodolist = () => {
        axios.delete("https://social-network.samuraijs.com/api/1.0/todo-lists/" + this.props.id,
           {withCredentials: true, headers: {"API-KEY": "5ac078f7-4935-4223-bad6-63f58b80cd23"}})
            .then(res => {
                this.props.deleteTodolist(this.props.id)
            });
        // this.props.deleteTodolist(this.props.id);
    };

    updateTask = (task) => {
        axios.put("https://social-network.samuraijs.com/api/1.0/todo-lists/tasks/", task,
          {withCredentials: true, headers: {"API-KEY": "5ac078f7-4935-4223-bad6-63f58b80cd23"}})
          .then(res => {
              debugger
              return this.props.updateTask(res.data.data.item)

          });
        // this.props.deleteTodolist(this.props.id);
    };

    deleteTask = (taskId) => {
        axios.delete("https://social-network.samuraijs.com/api/1.0/todo-lists/tasks/" + taskId,
                {withCredentials: true, headers: {"API-KEY": "5ac078f7-4935-4223-bad6-63f58b80cd23"}})
                .then(res => {
                    this.props.deleteTask(taskId, this.props.id)
                });
        // this.props.deleteTask(taskId, this.props.id);
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
                <div className="todoList">
                    <div className="todoList-header">
                            <TodoListTitle title={this.props.title} onDelete={this.deleteTodolist} />
                            <AddNewItemForm addItem={this.addTask} />

                    </div>

                    <TodoListTasks changeStatus={this.changeStatus }
                                   changeTitle={this.changeTitle }
                                   deleteTask={this.deleteTask}
                                   tasks={tasks.filter(t => {
                        if (this.state.filterValue === "All") {
                            return true;
                        }
                        if (this.state.filterValue === "Completed") {
                            return t.status === 2;
                        }
                        if (this.state.filterValue === "Active") {
                            return t.status === 0;
                        }
                    })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask(newTask, todolistId) {

            //const action = addTaskAC(newTask, todolistId);
            dispatch(addTaskAC(newTask, todolistId));
        },
        updateTask(task) {
            const action =  updateTaskAC(task);
            dispatch(action);
        },
        deleteTodolist: (todolistId) => {
            const action = deleteTodolistAC(todolistId);
            dispatch(action)
        },
        deleteTask: (taskId, todolistId) => {
            const action = deleteTaskAC(taskId, todolistId);
            dispatch(action)
        },
        setTodolists: (totdolists) => {
            const action = setTodoListAC(totdolists);
            dispatch(action);
        },
        setTasks: (tasks, todolistId) => {
            const action = setTasksAC(tasks, todolistId);
            dispatch(action);
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state
    }
};
const ConnectedTodolist = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default ConnectedTodolist;

