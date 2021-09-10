import { v4 as uuid } from 'uuid';
import {
  CREATE_LIST,
  CREATE_TODO,
  DELETE_LIST,
  DELETE_TODO,
  EDIT_TODO,
  REORDER_TODO,
  TOGGLE_TODO,
} from '../constants/constants';

const fakeState = {
  lists: [
    {
      id: uuid(),
      name: 'List 1',
      todos: [
        { id: uuid(), text: 'Learn Beautiful-DnD', completed: false },
        { id: uuid(), text: 'Implement dnd', completed: false },
        { id: uuid(), text: 'Get some sleep', completed: false },
      ],
    },
    {
      id: uuid(),
      name: 'List 2',
      todos: [
        { id: uuid(), text: 'Learn Beautiful-DnD 2', completed: false },
        { id: uuid(), text: 'Implement dnd 2', completed: false },
        { id: uuid(), text: 'Get some sleep 2', completed: false },
      ],
    },
  ],
};

const reducer = (state = fakeState, action) => {
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

    default:
      return state;
  }
};

export default reducer;
