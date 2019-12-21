import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

  state = {
    editMode: false,
    title: this.props.task.title
  };

  onIsDoneChanged = (e) => {
    let status = e.currentTarget.checked ? 2 : 0;
    this.props.changeStatus(this.props.task.id, status);
  };

  onTitleChanged = (e) => {
    this.setState({title: e.currentTarget.value});
  };

  activateEditMode = () => {
    this.setState({editMode: true});
  };

  deactivateEditMode = () => {
    this.props.changeTitle(this.props.task.id, this.state.title);
    this.setState({editMode: false});
  };

  onDeleteTask = () => {
    this.props.deleteTask(this.props.task.id);
  };

  render = () => {
    let containerCssClass = this.props.task.status === 2 ? "done" : "undone";
    let priotityTitle = "";
    switch (this.props.task.priority) {
      case 0:
        priotityTitle = "Low";
        break;
      case 1:
        priotityTitle = "Middle";
        break;
      case 2:
        priotityTitle = "High";
        break;
      case 3:
        priotityTitle = "Urgently";
        break;
      case 4:
        priotityTitle = "Later";
        break;
      default:
        priotityTitle = "Low";
    }

    return (
      <section className={containerCssClass}>
        <div className="task-title">
          <h2>{containerCssClass}</h2><button onClick={this.onDeleteTask}>X</button>
        </div>
        <label>
          <input type="checkbox" checked={this.props.task.status}
                 onChange={this.onIsDoneChanged}/>
          {this.state.editMode
            ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                     value={this.state.title}/>
            : <span onClick={this.activateEditMode}>{this.props.task.title}</span>
          }, priority: {priotityTitle}
        </label>
      </section>
    );
  }
}

export default TodoListTask;

