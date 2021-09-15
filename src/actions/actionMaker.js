import {
  CREATE_LIST,
  CREATE_TODO,
  DELETE_LIST,
  DELETE_TODO,
  EDIT_LIST_NAME,
  EDIT_TODO,
  TOGGLE_TODO,
} from '../constants/constants';

export const addList = (listName) => {
  return {
    type: CREATE_LIST,
    payload: {
      listName,
    },
  };
};

export const removeList = (listId) => {
  return {
    type: DELETE_LIST,
    payload: {
      listId,
    },
  };
};

export const changeListName = (listId, newName) => {
  return {
    type: EDIT_LIST_NAME,
    payload: {
      listId,
      newName,
    },
  };
};

export const createTodo = (listId, todoText) => {
  return {
    type: CREATE_TODO,
    payload: {
      listId,
      todoText,
    },
  };
};

export const editTodo = (listId, todoId, newText) => {
  return {
    type: EDIT_TODO,
    payload: {
      listId,
      todoId,
      newText,
    },
  };
};

export const toggleTodo = (listId, todoId) => {
  return {
    type: TOGGLE_TODO,
    payload: {
      listId,
      todoId,
    },
  };
};

export const deleteTodo = (listId, todoId) => {
  return {
    type: DELETE_TODO,
    payload: {
      listId,
      todoId,
    },
  };
};
