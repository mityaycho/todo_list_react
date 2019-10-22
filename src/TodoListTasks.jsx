import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
  render = () => {
    let tasksElements = this.props.tasks.map(el => <TodoListTask
      task={el}
      changeTaskStatus={this.props.changeTaskStatus} />);
    return (
      <div className="todoList-tasks">
        {tasksElements}
      </div>
    );
  };
};

export default TodoListTasks;