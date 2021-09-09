import { v4 as uuid } from 'uuid';
import {
  CREATE_LIST,
  CREATE_TODO,
  DELETE_LIST,
  DELETE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
} from '../constants/constants';

const reducer = (state = { lists: [] }, action) => {
  switch (action.type) {
    case CREATE_LIST:
      const newList = {
        id: uuid(),
        name: action.payload.listName,
        todos: [],
      };
      return { lists: [...state.lists, newList] };

    case DELETE_LIST:
      return {
        lists: state.lists.filter((list) => action.payload.listId !== list.id),
      };

    case CREATE_TODO:
      const newTodo = {
        id: uuid(),
        text: action.payload.todoText,
        completed: false,
      };

      return {
        lists: state.lists.map((list) => {
          if (list.id === action.payload.listId) {
            return list.todos.push(newTodo);
          } else {
            return list;
          }
        }),
      };

    case EDIT_TODO:
      return {
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
    default:
      return state;
  }
};

export default reducer;
