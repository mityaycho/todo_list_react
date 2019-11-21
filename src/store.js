import {createStore} from "redux";

const initialState = {
  todolists: [
    {id: 0, title: "1 todo", tasks: [{id: 0, title: 'a', isDone: false, priority: 'low'}]},
    {id: 1, title: "2 todo", tasks: [{id: 1, title: 'b', isDone: false, priority: 'low'}]},
    {id: 2, title: "3 todo", tasks: [{id: 2, title: 'c', isDone: false, priority: 'low'}]}
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODOLIST":
      return {
        ...state, todolists: [...state.todolists, action.newTodoList]
      }
    case "ADD_TASK":
      return {
        ...state,
        todolists: state.todolists.map((todo) => {
          if (todo.id === action.todolistId) {
            return {...todo, tasks: [...todo.tasks, action.newTask]}
          } else {
            return todo
          }
        })
      }
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;