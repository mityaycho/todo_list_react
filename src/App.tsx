import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistTC, loadTodolistsTC} from "./reducer";


interface IProps {
  addTodolist: any;
  loadTodolists: any;
  todolists: any[];
}

interface IAddTodoList {
  addTodolist: (title: string) => void;
}

class App extends React.Component<IProps, IAddTodoList> {

  addTodoList = (title: string) => {
    this.props.addTodolist(title);
  };

  componentDidMount() {
    this.restoreState();
  };

  restoreState = () => {
    this.props.loadTodolists();
  };

  render = () => {
    const todolists = this.props.todolists
      .map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>);

    return (
      <div className="App">
        <div className="todoList">
          <AddNewItemForm addItem={this.addTodoList} placeholder="New title task"/>
        </div>
        <div className="todo-list-task">
          {todolists}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    todolists: state.todolists
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadTodolists: () => {
      dispatch(loadTodolistsTC())
    },
    addTodolist: (title: string) => {
      const action = addTodolistTC(title);
      dispatch(action)
    }
  }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

