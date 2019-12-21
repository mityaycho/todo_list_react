import React from 'react';
import './App.css';

class TodoListTitle extends React.Component {
  state = {
    editMode: false,
    title: this.props.title
  }

  onTitleChanged = (e) => {
    this.setState({title: e.currentTarget.value});
  }

  deactivateEditMode = () => {
    this.setState({editMode: false});
    this.props.updateTitle(this.state.title);
  }

  activateEditMode = () => {
    this.setState({editMode: true});
  }

  render = () => {
    return (
      <>
        {
          this.state.editMode
            ? <input value={this.state.title} autoFocus={true} onBlur={this.deactivateEditMode}
                     onChange={this.onTitleChanged}/>
            : <h1 className="todoList-header__title" onClick={this.activateEditMode}>{this.props.title}
              <button className="universe-button" onClick={this.props.onDelete}>delete</button>
            </h1>
        }
      </>
    );
  }
}

export default TodoListTitle;

