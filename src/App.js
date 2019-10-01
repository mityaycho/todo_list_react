import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    tasks = [
        {title: "CSS", priority: "high", isDone: true},
        {title: "JS", priority: "low", isDone: false},
        {title: "ReactJS", priority: "low", isDone: false},
        {title: "Patterns", priority: "high", isDone: true}
    ];

    filterValue = 'All';

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader />
                    <TodoListTasks tasks={this.tasks} />
                    <TodoListFooter filterValue={this.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

