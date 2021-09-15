import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo, toggleTodo } from '../actions/actionMaker';
import './Todo.scss';

const Todo = (props) => {
  const [editing, setEditing] = useState(false);

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
                editing
                  ? 'todo-text--hidden'
                  : props.completed
                  ? 'todo-text--completed'
                  : 'todo-text'
              }
              onDoubleClick={() => setEditing(!editing)}
              onClick={handleToggle}
            >
              {props.text}
            </p>
            <input
              className={!editing ? 'todo-input--hidden' : 'todo-input'}
              type='text'
              value={props.text}
              onChange={handleChange}
              onMouseLeave={() => setEditing(!editing)}
            />
            <i class='fas fa-trash' onClick={handleDelete}></i>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
