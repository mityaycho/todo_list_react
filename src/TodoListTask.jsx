import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
  onIsDoneChanged = (event) => {
    this.props.changeTaskStatus(this.props.task, event.currentTarget.checked);
  };

  render = () => {
    return (
      <div className="todoList-tasks">
        <div className="todoList-task">
          <input
            onChange={this.onIsDoneChanged}
            type="checkbox"
            checked={this.props.task.isDone} />
          <span>{this.props.task.title}, {this.props.task.priority}</span>
        </div>
      </div>
    );
  };
};

export default TodoListTask;