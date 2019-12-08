export const ADD_TODOLIST = "TADD-TODOLIST";
export const SET_TOTDOLISTS = "SET_TOTDOLISTS";
export const SET_TASKS = "SET_TASKS";
export const DELETE_TODOLIST = "DELETE-TODOLIST";
export const DELETE_TASK = "DELETE-TASK";
export const ADD_TASK = "ADD-TASK";
export const UPDATE_TASK = "UPDATE-TASK";

const initialState = {
  "todolists": [
    // {
    //     "id": 0, "title": "every day",
    //     tasks: [
    //         {"title": "css11", "isDone": false, "priority": "low", "id": 0},
    //         {"title": "js", "isDone": false, "priority": "low", "id": 1},
    //         {"title": "react", "isDone": false, "priority": "low", "id": 2},
    //         {"title": "sasasa", "isDone": false, "priority": "low", "id": 3},
    //         {"title": "yoaa", "isDone": false, "priority": "low", "id": 4},
    //         {"title": "sddsdsds", "isDone": false, "priority": "low", "id": 5}]
    // },
    // {"id": 1, "title": "tomorrow", tasks: []},
    // {"id": 2, "title": "weewwe`", tasks: []},
    // {"id": 3, "title": "dddd", tasks: []}
  ]
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TODOLIST:
      return {
        todolists: [{...action.newTodolist, tasks: []}, ...state.todolists]
      };
    case SET_TOTDOLISTS:
      return {
        ...state,
        todolists: action.todolists.map(el => ({...el, tasks: []}))
      };
    case SET_TASKS:
      return {
        ...state,
        todolists: state.todolists.map(el => {
          if (el.id === action.todolistId) {
            return {
              ...el,
              tasks: action.tasks
            }
          } else {
            return el;
          }
        })
      };
    case DELETE_TODOLIST:
      return {
        ...state,
        todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
      };
    case DELETE_TASK:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id === action.todolistId) {
            return {
              ...tl,
              tasks: tl.tasks.filter(el => el.id !== action.taskId)
            }
          } else {
            return tl
          }
        })
      };
    case ADD_TASK:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id === action.todolistId) {
            return {...tl, tasks: [...tl.tasks, action.newTask]}
          } else {
            return tl
          }
        })
      };
    case UPDATE_TASK:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id === action.todolistId) {
            return {
              ...tl,
              tasks: tl.tasks.map(t => {
                if (t.id !== action.taskId) {
                  console.log(action.isDone)
                  return t;
                } else {
                  return {...t, status: action.isDone};
                }
              })
            }
          } else {
            return tl
          }
        })
      };
    default: {
        return state;
      }
  }
};

export const updateTaskAC = (taskId, isDone, todolistId) => ({type: UPDATE_TASK, taskId, isDone, todolistId});
export const deleteTodolistAC = (todolistId) => ({type: DELETE_TODOLIST, todolistId: todolistId});
export const deleteTaskAC = (taskId, todolistId) => ({type: DELETE_TASK, taskId, todolistId});
export const addTaskAC = (newTask, todolistId) => ({type: ADD_TASK, newTask, todolistId});
export const addTodolistAC = (newTodolist) => ({type: ADD_TODOLIST, newTodolist});
export const setTodoListAC = (todolists) => ({type: SET_TOTDOLISTS, todolists});
export const setTasksAC = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId});

export default reducer;
