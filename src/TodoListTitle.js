import React from 'react';
import './App.css';

class TodoListTitle extends React.Component {
   render = () => {
        return (
          <div>
            {this.props.editMode ?
              <input type="text" value={this.state.todoTitle} onBlur={this.props.deactivateEditMode}
              onChange={this.changeTodoTitle}/> :
            <h3 className="todoList-header__title">{this.props.title}
              <button onClick={this.props.onDelete}>X</button>
            </h3>
            }
          </div>
        );
    }
}

export default TodoListTitle;

