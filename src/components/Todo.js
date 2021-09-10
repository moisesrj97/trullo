import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './Todo.scss';

const Todo = (props) => {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className='Todo'>
            <p>{props.text}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
