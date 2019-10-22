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
    filterValue: "All"
  };

  addTask = (newTitle) => {
    let newTask = {
      title: newTitle,
      priority: "high",
      isDone: false
    };
    let newTasks = [...this.state.tasks, newTask];
    this.setState({tasks: newTasks});
  };

  changeFilter = (newFilterValue) => {
    this.setState({filterValue: newFilterValue});
  };

  changeTaskStatus = (task, isDone) => {
    let newTasks = this.state.tasks.map(el => el !== task ? el : {...el, isDone: isDone});
    this.setState({ tasks: newTasks });
  };

  render = () => {
    return (
      <div className="App">
        <div className="todoList">
          <TodoListHeader addTask={this.addTask} />
          <TodoListTasks
            changeTaskStatus={this.changeTaskStatus}
            tasks={this.state.tasks.filter(el => {
            switch (this.state.filterValue) {
              case "All":
                return true;
              case "Active":
                return !el.isDone;
              case "Completed":
                return el.isDone;
            }
          })} />
          <TodoListFooter filterValue={this.state.filterValue} onChangeFilter={this.changeFilter} />
        </div>
      </div>
    );
  };
};

export default App;

