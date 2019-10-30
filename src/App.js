import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.newTasksTitileRef = React.createRef();
  }

  state = {
    tasks: [
      {id: 0, title: "JS", isDone: true, priority: "medium"},
      {id: 1, title: "HTML", isDone: true, priority: "low"},
      {id: 2, title: "CSS", isDone: true, priority: "low"},
      {id: 3, title: "ReactJS", isDone: false, priority: "high"}
    ],
    filterValue: "All"
  };
  nextTaskId = 4;

  saveState = () => {
    let stateAsString = JSON.stringify(this.state);
    localStorage.setItem("our-state", stateAsString);
  };

  restoreState = () => {
    let state = this.state;
    let stateAsString = localStorage.getItem("our-state");
    if (stateAsString != null) {
      state = JSON.parse(stateAsString);
    }
    this.setState(state, () => this.state.tasks.forEach(el => {
      if (el.id >= this.nextTaskId) {
        this.nextTaskId = el.id + 1;
      };
    }));
  };

  componentDidMount() {
    this.restoreState();
  };

  addTask = (newText) => {
    let newTask = {
      id: this.nextTaskId,
      title: newText,
      isDone: false,
      priority: "low"
    };
    this.nextTaskId++;
    let newTasks = [...this.state.tasks, newTask];
    this.setState({
      tasks: newTasks
    }, this.saveState);
  }

  changeFilter = (newFilterValue) => {
    this.setState({
      filterValue: newFilterValue
    }, this.saveState);
  }

  changeStatus = (taskId, isDone) => {
    this.changeTask(taskId, {isDone});
  };

  changeTitle = (taskId, newTitle) => {
    this.changeTask(taskId, {title: newTitle});
  };

  changeTask = (taskId, newPropsObj) => {
    let newTasks = this.state.tasks.map(el => {
      if (el.id != taskId) {
        return el;
      } else {
        return {...el, ...newPropsObj};
      };
    });
    this.setState({tasks: newTasks}, this.saveState);
  };

  render = () => {

    return (
      <div className="App">
        <div className="todoList">
          <TodoListHeader addTask={this.addTask}/>
          <TodoListTasks changeStatus={this.changeStatus}
                         changeTitle={this.changeTitle}
                         tasks={this.state.tasks.filter(t => {
                           if (this.state.filterValue === "All") {
                             return true;
                           }
                           if (this.state.filterValue === "Active") {
                             return t.isDone === false;
                           }
                           if (this.state.filterValue === "Completed") {
                             return t.isDone === true;
                           }
                         })}/>
          <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
        </div>
      </div>
    );
  }
}

export default App;

