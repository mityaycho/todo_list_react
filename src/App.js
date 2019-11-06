import React from 'react';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";

class App extends React.Component {
  state = {
    todolists: []
  };

  nextTodoListId = 0;

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("todolists", stateAsString);
    }

    restoreState = () => {
        // объявляем наш стейт стартовый
        let state = {
            todolists: []
        };

        let stateAsString = localStorage.getItem("todolists");
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.todolists.forEach(t => {
                if (t.id >= this.nextTodoListId) {
                    this.nextTodoListId = t.id + 1;
                }
            })
        }, this.saveState);
    }

  addTodoList = (title) => {
      let newTodoList = {
          id: this.nextTodoListId,
          title: title
      }
      this.nextTodoListId++;
      let newTodoLists = [...this.state.todolists, newTodoList];
      this.setState({todolists: newTodoLists}, this.saveState);
  }



  render() {
    const todolists = this.state.todolists.map(el => <TodoList id={el.id} title={el.title}/>)
    return (
      <div>
          <AddNewItemForm addItem={this.addTodoList} />
        {/*<div>*/}
        {/*  <input type="text"/>*/}
        {/*  <button onClick={this.addTodolist}>Add</button>*/}
        {/*</div>*/}
        <div className="App">
          {todolists}
        </div>
      </div>
    )
  }
}

export default App;

