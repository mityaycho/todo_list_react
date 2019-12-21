import {api} from "./api";

export const ADD_TODOLIST = "TodoList/Reducer/ADD-TODOLIST";
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
export const UPDATE_TODOLIST_TITLE = "TodoList/Reducer/UPDATE_TODOLIST_TITLE";
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const SET_TASKS = "TodoList/Reducer/SET_TASKS";
export const UPDATE_TASK = "TodoList/Reducer/UPDATE-TASK";
export const SET_TODOLISTS = "TodoList/Reducer/SET_TODOLISTS";

const initialState = {
  "todolists": [
    // {
    //     "id": 0, "title": "every day",
    //     tasks: [
    //         {"title": "css", "isDone": false, "priority": "low", "id": 0},
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
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id !== action.todolistId) {
            return tl;
          } else {
            return {...tl, tasks: action.tasks}
          }
        })
      };
    case SET_TODOLISTS:
      return {
        ...state,
        todolists: action.todolists.map(tl => ({...tl, tasks: []}))
      };
    case ADD_TODOLIST:
      return {
        ...state,
        todolists: [...state.todolists, action.newTodolist]
      };
    case DELETE_TODOLIST:
      return {
        ...state,
        todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
      };
    case UPDATE_TODOLIST_TITLE:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id !== action.todolistId) return tl;
          else return {...tl, title: action.title}
        })
      };
    case DELETE_TASK:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id === action.todolistId) {
            return {
              ...tl,
              tasks: tl.tasks.filter(t => t.id !== action.taskId)
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
                  return t;
                } else {
                  return {...t, ...action.obj};
                }
              })
            }
          } else {
            return tl
          }
        })
      };
    default:
      return state
  }
};

const updateTaskAC = (taskId, obj, todolistId) => ({type: UPDATE_TASK, taskId, obj, todolistId});
export const updateTaskTC = (taskId, obj, todolistId) => (dispatch, getState) => {
  let todolist = getState().todolists.find(tl => tl.id === todolistId);
  let tasks = todolist.tasks;
  let task = tasks.find(t => t.id === taskId);
  api.updateTask({...task, ...obj})
    .then(res => {
      dispatch(updateTaskAC(taskId, obj, todolistId))
    })
};

const deleteTodolistAC = (todolistId) => ({type: DELETE_TODOLIST, todolistId: todolistId});
export const deleteTodolistTC = (todolistId) => (dispatch) => {
  api.deleteTodolist(todolistId)
    .then(res => {
      dispatch(deleteTodolistAC(todolistId));
    });
};

const deleteTaskAC = (taskId, todolistId) => ({type: DELETE_TASK, taskId, todolistId});
export const deleteTaskTC = (taskId, todolistId) => (dispatch) => {
  api.deleteTask(taskId)
    .then(res => {
      dispatch(deleteTaskAC(taskId, todolistId));
    });
};

const updateTodolistTitleAC = (title, todolistId) => ({type: UPDATE_TODOLIST_TITLE, title, todolistId});
export const updateTodolistTitleTC = (title, todolistId) => (dispatch) => {
  api.updateTodolistTitle(title, todolistId)
    .then(res => {
      dispatch(updateTodolistTitleAC(title, todolistId));
    });
};


const addTaskAC = (newTask, todolistId) => ({type: ADD_TASK, newTask, todolistId});
export const addTaskTC = (newText, todolistId) => (dispatch) => {
  api.createTask(newText, todolistId)
    .then(res => {
      let newTask = res.data.data.item;
      dispatch(addTaskAC(newTask, todolistId));
    });
};

const setTasksAC = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId});
export const setTasksTC = (todolistId) => (dispatch) => {
  api.getTasks(todolistId)
    .then(res => {
      let allTasks = res.data.items;                           // items - это таски сервака
      dispatch(setTasksAC(allTasks, todolistId));
    });
};

const addTodolistAC = (newTodolist) => ({type: ADD_TODOLIST, newTodolist: newTodolist});
export const addTodolistTC = (title) => (dispatch) => {
  api.createTodolist(title)
    .then(res => {
      let todolist = res.data.data.item;
      dispatch(addTodolistAC(todolist));
    });
};

export const setTodolistsAC = (todolists) => ({type: SET_TODOLISTS, todolists: todolists});
export const loadTodolistsTC = () => (dispatch, getState) => {
  api.getTodolists()
    .then(res => {
      dispatch(setTodolistsAC(res.data))
    });
};

export default reducer;
