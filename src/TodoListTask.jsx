import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

  onIsDoneChanged = (e) => {
    debugger;
    this.props.onTaskStatusChanged(this.props.task, e.currentTarget.checked);
  }

  render = () => {
    return (
      <div className={this.props.task.isDone ? "todoList-task done" : "todoList-task"}>
        <input type="checkbox" checked={this.props.task.isDone}
               onChange={this.onIsDoneChanged}/>
        <span>{this.props.task.title}</span>,
        priority: {this.props.task.priority}
      </div>
    );
  }
}

export default TodoListTask;

