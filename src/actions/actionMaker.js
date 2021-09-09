import {
  CREATE_LIST,
  CREATE_TODO,
  DELETE_LIST,
  DELETE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
} from '../constants/constants';

const addList = (listName) => {
  return {
    type: CREATE_LIST,
    payload: {
      listName,
    },
  };
};

const removeList = (listId) => {
  return {
    type: DELETE_LIST,
    payload: {
      listId,
    },
  };
};

const createTodo = (listId, todoText) => {
  return {
    type: CREATE_TODO,
    payload: {
      listId,
      todoText,
    },
  };
};

const editTodo = (listId, todoId, newText) => {
  return {
    type: EDIT_TODO,
    payload: {
      listId,
      todoId,
      newText,
    },
  };
};

const toggleTodo = (listId, todoId) => {
  return {
    type: TOGGLE_TODO,
    payload: {
      listId,
      todoId,
    },
  };
};

const deleteTodo = (listId, todoId) => {
  return {
    type: DELETE_TODO,
    payload: {
      listId,
      todoId,
    },
  };
};
