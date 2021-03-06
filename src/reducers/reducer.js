import { v4 as uuid } from 'uuid';
import {
  CREATE_LIST,
  CREATE_TODO,
  DARKMODE_TOGGLE,
  DELETE_LIST,
  DELETE_TODO,
  EDIT_LIST_NAME,
  EDIT_TODO,
  REORDER_COLUMN,
  REORDER_TODO,
  TOGGLE_TODO,
} from '../constants/constants';

const reducer = (
  state = JSON.parse(window.localStorage.getItem('trullo')) || {
    lists: [],
    darkMode: false,
  },
  action
) => {
  switch (action.type) {
    case CREATE_LIST:
      const newList = {
        id: uuid(),
        name: action.payload.listName,
        todos: [],
      };
      const newState = { ...state, lists: [...state.lists, newList] };
      return newState;
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => action.payload.listId !== list.id),
      };
    case EDIT_LIST_NAME:
      return {
        ...state,
        lists: state.lists.map((e) => {
          if (e.id === action.payload.listId) {
            return { ...e, name: action.payload.newName };
          } else {
            return e;
          }
        }),
      };
    case CREATE_TODO:
      const newTodo = {
        id: uuid(),
        text: action.payload.todoText,
        completed: false,
      };

      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === action.payload.listId) {
            list.todos.push(newTodo);
            return list;
          } else {
            return list;
          }
        }),
      };
    case EDIT_TODO:
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              todos: list.todos.map((todo) => {
                if (action.payload.todoId === todo.id) {
                  return { ...todo, text: action.payload.newText };
                } else {
                  return todo;
                }
              }),
            };
          } else {
            return list;
          }
        }),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              todos: list.todos.map((todo) => {
                if (action.payload.todoId === todo.id) {
                  if (todo.completed) {
                    return { ...todo, completed: false };
                  } else {
                    return { ...todo, completed: true };
                  }
                } else {
                  return todo;
                }
              }),
            };
          } else {
            return list;
          }
        }),
      };
    case DELETE_TODO:
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              todos: list.todos.filter(
                (todo) => action.payload.todoId !== todo.id
              ),
            };
          } else {
            return list;
          }
        }),
      };
    case REORDER_TODO:
      const sourceList = state.lists.find(
        (e) => e.id === action.payload.source.droppableId
      );

      const draggableTodo = sourceList.todos.find(
        (todo) => todo.id === action.payload.draggableId
      );

      if (!action.payload.destination) {
        return state;
      } else if (
        action.payload.destination.droppableId ===
        action.payload.source.droppableId
      ) {
        return {
          ...state,
          lists: state.lists.map((e) => {
            if (e.id === sourceList.id) {
              e.todos.splice(action.payload.source.index, 1);
              e.todos.splice(
                action.payload.destination.index,
                0,
                draggableTodo
              );
              return e;
            } else {
              return e;
            }
          }),
        };
      } else {
        return {
          ...state,
          lists: state.lists.map((list) => {
            if (list.id === action.payload.source.droppableId) {
              list.todos.splice(action.payload.source.index, 1);
              return list;
            } else if (list.id === action.payload.destination.droppableId) {
              list.todos.splice(
                action.payload.destination.index,
                0,
                draggableTodo
              );
              return list;
            } else {
              return list;
            }
          }),
        };
      }
    case REORDER_COLUMN:
      if (!action.payload.destination) {
        return state;
      } else {
        const draggableColumn = state.lists.find(
          (e) => e.id === action.payload.draggableId
        );
        const newList = [...state.lists];

        newList.splice(action.payload.source.index, 1);
        newList.splice(action.payload.destination.index, 0, draggableColumn);

        return {
          ...state,
          lists: newList,
        };
      }
    case DARKMODE_TOGGLE:
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

export default reducer;
