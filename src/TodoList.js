import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFilter from "./TodoListFilter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
  addTaskTC,
  deleteTaskTC,
  deleteTodolistTC,
  setTasksTC,
  updateTaskTC,
  updateTodolistTitleTC
} from "./reducer";


class TodoList extends React.Component {

  constructor(props) {
    super(props);
    this.newTasksTitileRef = React.createRef();
  };

  componentDidMount() {
    this.restoreState();
  };

  saveState = () => {
    // переводим объект в строку
    let stateAsString = JSON.stringify(this.state);
    // сохраняем нашу строку в localStorage под ключом "our-state"
    localStorage.setItem("our-state-" + this.props.id, stateAsString);
  };

  restoreState = () => {
    this.props.setTasks(this.props.id);
  };


  state = {
    filterValue: "All"
  };

  addTask = (newText) => {
    this.props.addTask(newText, this.props.id);
  };

  changeFilter = (newFilterValue) => {
    this.setState({
      filterValue: newFilterValue
    }, () => {
      this.saveState();
    });
  };

  changeTask = (taskId, obj) => {
    this.props.updateTask(taskId, obj, this.props.id);
  };

  changeStatus = (taskId, status) => {
    this.changeTask(taskId, {status: status});
  };

  changeTitle = (taskId, title) => {
    this.changeTask(taskId, {title: title});
  };

  deleteTodolist = () => {
    this.props.deleteTodolist(this.props.id);
  };

  deleteTask = (taskId) => {
    this.props.deleteTask(taskId, this.props.id);
  };

  updateTitle = (title) => {
    this.props.updateTodolistTitle(title, this.props.id);
  };

  render = () => {
    let {tasks = []} = this.props;
    return (
      <div className="todoListTitle">
        <main className="todo-list">
          <TodoListTitle title={this.props.title} onDelete={this.deleteTodolist} updateTitle={this.updateTitle}/>
          <AddNewItemForm addItem={this.addTask} placeholder="New task" />
        </main>
        <TodoListFilter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
        <TodoListTasks changeStatus={this.changeStatus}
                       changeTitle={this.changeTitle}
                       deleteTask={this.deleteTask}
          /*tasks={this.props.tasks.filter(t => {*/
                       tasks={tasks.filter(t => {
                         if (this.state.filterValue === "All") {
                           return true;
                         }
                         if (this.state.filterValue === "Active") {
                           return t.status === 0;
                         }
                         if (this.state.filterValue === "Completed") {
                           return t.status === 2;
                         }
                       })}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTask(newText, todolistId) {
      dispatch(addTaskTC(newText, todolistId));
    },
    setTasks(todolistId) {
      dispatch(setTasksTC(todolistId));
    },
    updateTask(taskId, obj, todolistId) {
      const action = updateTaskTC(taskId, obj, todolistId);
      dispatch(action);
    },
    deleteTodolist: (todolistId) => {
      const action = deleteTodolistTC(todolistId);
      dispatch(action)
    },
    deleteTask: (taskId, todolistId) => {
      const action = deleteTaskTC(taskId, todolistId);
      dispatch(action)
    },
    updateTodolistTitle: (title, todolistId) => {
      const action = updateTodolistTitleTC(title, todolistId);
      dispatch(action)
    }
  }
};

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedTodolist;

