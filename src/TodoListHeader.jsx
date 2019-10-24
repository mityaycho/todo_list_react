import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {

  state = {
    error: false,
    title: ""
  }

  onAddTaskClick = () => {
    if (this.state.title === "") {
      this.setState({error: true})
    } else {
      // передаём новый текст наружу
      this.props.onTaskAdded(this.state.title);
      this.setState({error: false, title: ""});
    }
  }

  onChange = (event) => this.setState({error: false, title: event.target.value})

  keyPress = (event) => event.key === "Enter" ? this.onAddTaskClick() : null;

  render = () => {
    let inputClassName = this.state.error ? "error" : "";
    return (
      <div className="todoList-header">
        <h3 className="todoList-header__title">What to Learn</h3>
        <div className="todoList-newTaskForm">
          <input type="text"
                 placeholder="New task name"
                 className={inputClassName}
                 onChange={event => this.onChange(event)}
                 onKeyPress={this.keyPress}
                 value={this.state.title}/>
          <button onClick={ this.onAddTaskClick }>Add</button>
        </div>
      </div>
    );
  }
}

export default TodoListHeader;

