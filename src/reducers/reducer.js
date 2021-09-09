import { v4 as uuid } from 'uuid';
import {
  CREATE_LIST,
  CREATE_TODO,
  DELETE_LIST,
  DELETE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
} from '../constants/constants';

const reducer = (state = { lists: [] }, { type, payload }) => {
  switch (type) {
    case CREATE_LIST:
      const newList = {
        id: uuid(),
        name: payload.listName,
        todos: [],
      };
      return { lists: [...state.lists, newList] };
    case DELETE_LIST:
      return {
        lists: state.lists.filter((list) => payload.listId !== list.id),
      };
    case CREATE_TODO:
      const newTodo = {
        id: uuid(),
        text: payload.todoText,
        completed: payload.todoCompleted,
      };
      return {
        lists: state.lists.map((list) => {
          if (list.id === payload.listId) {
            return list.todos.push(newTodo);
          } else {
            return list;
          }
        }),
      };
    case EDIT_TODO:
      return {
        lists: state.lists.map((list) => {
          if (list.id === payload.listId) {
            return {
              ...list,
              todos: list.todos.filter((todo) => payload.todoId !== todo.id),
            };
          } else {
            return list;
          }
        }),
      };
    case TOGGLE_TODO:
      return {
        lists: state.lists.map((list) => {
          if (list.id === payload.listId) {
            return {
              ...list,
              todos: list.todos.map((todo) => {
                if (payload.todoId === todo.id) {
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
          if (list.id === payload.listId) {
            return {
              ...list,
              todos: list.todos.filter((todo) => payload.todoId !== todo.id),
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
