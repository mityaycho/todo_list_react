import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
  state = {
    editMode: false
  };

  activatedEditMode = () => {
    this.setState({editMode: true})
  };

  deActivatedEditMode = () => {
    this.setState({editMode: false})
  };

  onIsDoneChanged = (e) => {
    this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
  };

  onTitleChanged = (e) => {
    this.props.changeTitle(this.props.task.id, e.currentTarget.value);
  };

  render = () => {

    let containerCssClass = this.props.task.isDone ? "todoList-task done" : "todoList-task";

    return (
      <div className={containerCssClass}>
        <input id={this.props.task.id}
               type="checkbox"
               checked={this.props.task.isDone}
               onChange={this.onIsDoneChanged}/>
        { this.state.editMode ?
          <input autoFocus={true}
                 onBlur={this.deActivatedEditMode}
                 value={this.props.task.title}
                 onChange={this.onTitleChanged}
                 type="text"/>
          : <span onClick={this.activatedEditMode}>{this.props.task.id} - {this.props.task.title}</span>
        }, priority: {this.props.task.priority}
      </div>
    );
  }
}

export default TodoListTask;

