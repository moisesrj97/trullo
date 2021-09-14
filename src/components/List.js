import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './List.scss';
import Todo from './Todo';

const List = (props) => {
  return (
    <div className='List'>
      <h2>{props.listInfo.name}</h2>
      <Droppable droppableId={props.listInfo.id} type='todo'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            placeholder={provided.placeholder}
            todos={props.listInfo.todos}
          >
            {props.listInfo.todos.map((todo, index) => {
              return <Todo {...todo} index={index} key={todo.id} />;
            })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default List;
