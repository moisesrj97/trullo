import React from 'react';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { changeListName, createTodo, removeList } from '../actions/actionMaker';
import './List.scss';
import Todo from './Todo';

const List = (props) => {
  const [inputText, setInputText] = useState('');
  const [editing, setEditing] = useState(false);
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  const handleInputChange = (evt) => {
    setInputText(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(createTodo(props.listInfo.id, inputText));
    setInputText('');
  };

  const handleListNameChange = (evt) => {
    dispatch(changeListName(props.listInfo.id, evt.target.value));
  };

  const handleDelete = () => {
    dispatch(removeList(props.listInfo.id));
  };

  return (
    <div className='List'>
      <div className='list-title'>
        <h2
          className={
            (editing ? 'hidden' : null) + ' ' + (darkMode ? 'darkH2' : 'h2')
          }
          onDoubleClick={() => setEditing(true)}
        >
          {props.listInfo.name}
        </h2>
        <input
          type='text'
          value={props.listInfo.name}
          onChange={handleListNameChange}
          className={
            (editing ? 'list-name-input' : 'hidden') +
            ' ' +
            (darkMode ? 'dark' : null)
          }
          onMouseLeave={() => setEditing(false)}
        />
        <i
          class={darkMode ? 'fas fa-trash darkI' : 'fas fa-trash i'}
          onClick={handleDelete}
        ></i>
      </div>

      <Droppable droppableId={props.listInfo.id} type='todo'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            placeholder={provided.placeholder}
            todos={props.listInfo.todos}
          >
            {props.listInfo.todos.map((todo, index) => {
              return (
                <Todo
                  {...todo}
                  index={index}
                  key={todo.id}
                  listId={props.listInfo.id}
                />
              );
            })}

            {provided.placeholder}
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='New todo...'
                onChange={handleInputChange}
                value={inputText}
                className={darkMode ? 'darkInput' : 'input'}
              />
            </form>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default List;
