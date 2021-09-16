import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, editTodo, toggleTodo } from '../actions/actionMaker';
import './Todo.scss';

const Todo = (props) => {
  const [editing, setEditing] = useState(false);
  const darkMode = useSelector((state) => state.darkMode);

  const dispatch = useDispatch();

  const handleChange = (evt) => {
    dispatch(editTodo(props.listId, props.id, evt.target.value));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(props.listId, props.id));
  };

  const handleToggle = () => {
    dispatch(toggleTodo(props.listId, props.id));
  };

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className='Todo'>
            <p
              className={
                (editing
                  ? 'todo-text--hidden'
                  : props.completed
                  ? 'todo-text--completed'
                  : 'todo-text') +
                ' ' +
                (darkMode ? 'dark' : null)
              }
              onDoubleClick={() => setEditing(!editing)}
              onClick={handleToggle}
            >
              {props.text}
            </p>
            <input
              className={
                (!editing ? 'todo-input--hidden' : 'todo-input') +
                ' ' +
                (darkMode ? 'dark' : null)
              }
              type='text'
              value={props.text}
              onChange={handleChange}
              onMouseLeave={() => setEditing(!editing)}
            />
            <i
              class={darkMode ? 'fas fa-trash darkTodoI' : 'fas fa-trash todoI'}
              onClick={handleDelete}
            ></i>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
