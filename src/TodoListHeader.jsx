import React from "react";
import './App.css';

class TodoListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.newTaskTitleRef = React.createRef();
  };

  onAddTaskClick = () => {
    let newTitle = this.newTaskTitleRef.current.value;
    this.newTaskTitleRef.current.value = '';
    this.props.addTask(newTitle);
  }

  render() {
    return (
      <div>
        <h3 className="todoList-header__title">What to Learn</h3>
        <div className="todoList-newTaskForm">
          <input ref={this.newTaskTitleRef} type="text" placeholder="New task name"/>
          <button onClick={this.onAddTaskClick}>Add</button>
        </div>
      </div>
    );
  }
};

export default TodoListHeader;