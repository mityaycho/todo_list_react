import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

  onIsDoneChanged = (e) => {
    this.props.changeStatus(this.props.task.id, e.currentTarget.checked ? 2 : 0);
  };

  onTitleChanged = (e) => {
    this.props.changeTitle(this.props.task.id, e.currentTarget.value);
  };

  state = {
    editMode: false
  };

  activateEditMode = () => {
    this.setState({editMode: true});
  };

  deactivateEditMode = () => {
    this.setState({editMode: false});
  };
  onDeleteTask = () => {
    this.props.deleteTask(this.props.task.id);
  };
  render = () => {
    let containerCssClass = this.props.task.status ? "todoList-task done" : "todoList-task";
    return (
      <div className={containerCssClass}>
        <input type="checkbox" checked={this.props.task.status}
               onChange={this.onIsDoneChanged}/>
        {this.state.editMode
          ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                   value={this.props.task.title}/>
          : <span onClick={this.activateEditMode}>{this.props.task.title}</span>
        }, priority: {this.props.task.priority}
        <button onClick={this.onDeleteTask}>x</button>
      </div>
    );
  }
}

export default TodoListTask;

