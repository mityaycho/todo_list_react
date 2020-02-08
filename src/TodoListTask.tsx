import React from 'react';
import './App.css';
import {Button} from './Button';

interface IProps {
  task: any;
  title: string;
  changeStatus: any;
  changeTitle: any;
  deleteTask: any;
}

class TodoListTask extends React.Component<IProps> {

  state = {
    editMode: false,
    title: this.props.task.title
  };

  onIsDoneChanged = (e: any) => {
    let status = e.currentTarget.checked ? 2 : 0;
    this.props.changeStatus(this.props.task.id, status);
  };

  onTitleChanged = (e: any) => {
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
    let priorityTitle = "";
    switch (this.props.task.priority) {
      case 0:
        priorityTitle = "Low";
        break;
      case 1:
        priorityTitle = "Middle";
        break;
      case 2:
        priorityTitle = "High";
        break;
      case 3:
        priorityTitle = "Urgently";
        break;
      case 4:
        priorityTitle = "Later";
        break;
      default:
        priorityTitle = "Low";
    }

    return (
      <section className={containerCssClass}>
        <div className="task-title">
          <h2>{containerCssClass}</h2><Button className="universe-button"
                                              title="delete"
                                              onClick={this.onDeleteTask}/>
        </div>
        <label className="task-container">
          <span>
           <input className="task-checkbox" type="checkbox" checked={this.props.task.status}
                  onChange={this.onIsDoneChanged}/>
            {this.state.editMode
              ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                       value={this.state.title}/>
              : <span className="task" onDoubleClick={this.activateEditMode}>{this.props.task.title}</span>
            }
          </span>
          priority: {priorityTitle}
        </label>
      </section>
    );
  }
}

export default TodoListTask;

