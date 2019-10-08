import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.newTaskTitleRef = React.createRef();
  };

  state = {
    tasks: [
      {title: "CSS", priority: "high", isDone: true},
      {title: "JS", priority: "low", isDone: false},
      {title: "ReactJS", priority: "low", isDone: false},
      {title: "Patterns", priority: "high", isDone: true}
    ],
    filterValue: "Active"
  };

  onAddTaskClick = () => {
    let newTask = {
        title: this.newTaskTitleRef.current.value,
        priority: "high",
        isDone: false
    };
    this.newTaskTitleRef.current.value = '';
    let newTasks = [...this.state.tasks, newTask];
    this.setState({
      tasks: newTasks
    })
  };

  render = () => {
    return (
      <div className="App">
        <div className="todoList">
          <div className="todoList-header">
            <h3 className="todoList-header__title">What to Learn</h3>
            <div className="todoList-newTaskForm">
              <input ref={this.newTaskTitleRef} type="text" placeholder="New task name"/>
              <button onClick={this.onAddTaskClick}>Add
              </button>
            </div>
          </div>
          {/*<TodoListHeader />*/}
          <TodoListTasks tasks={this.state.tasks}/>
          <TodoListFooter filterValue={this.state.filterValue}/>
        </div>
      </div>
    );
  }
}

export default App;

