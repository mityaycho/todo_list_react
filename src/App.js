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
      {title: "JS", isDone: true, priority: "medium"},
      {title: "HTML", isDone: true, priority: "low"},
      {title: "CSS", isDone: true, priority: "low"},
      {title: "ReactJS", isDone: false, priority: "high"}
    ],
    filterValue: "All"
  };

  onTaskAdded = (newText) => {
    let newTask = {
      title: newText,
      isDone: false,
      priority: "low"
    };
    let newTasks = [...this.state.tasks, newTask];
    this.setState( {
      tasks: newTasks
    });
  }

  onFilterChanged = (newFilterValue) => {
    this.setState( {
      filterValue: newFilterValue
    });
  }

  onTaskStatusChanged = (task, isDone) => {
    // создадим с помощью map новый массив, в котором все остальные таски будут сидеть такие же,
    // а вот та, которую нужно изменить, будет другой: вернём копию таски с изменённым сво-вом
    let newTasks = this.state.tasks.map(t => {
      if (t != task) {
        return t; //возвращаем таску без изменения, если это не та таска, которую нужно поменять
      }
      else {
        // делаем копию таски и сразу перезатираем в ней сво-во isDone новым значением
        return {...t, isDone: isDone};
      }
    });
    // а уже получив новый массив, изменяем этот массив в state с помощью setState
    this.setState({
      tasks: newTasks
    })

  }

  render = () => {

    return (
      <div className="App">
        <div className="todoList">
          <TodoListHeader onTaskAdded={this.onTaskAdded} />
          <TodoListTasks onTaskStatusChanged={this.onTaskStatusChanged }
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
          <TodoListFooter onFilterChanged={this.onFilterChanged} filterValue={this.state.filterValue} />
        </div>
      </div>
    );
  }
}

export default App;

