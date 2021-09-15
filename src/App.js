import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { v4 as uuid } from 'uuid';

import List from './components/List';
import { REORDER_COLUMN, REORDER_TODO } from './constants/constants';
import { useEffect, useState } from 'react';
import { addList } from './actions/actionMaker';

function App() {
  const [newListName, setNewListName] = useState('');
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Use effect!');
    window.localStorage.setItem('trullo', JSON.stringify(state));
  }, [state]);

  const onDragEnd = (result) => {
    // console.log(result);
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === 'todo') {
      dispatch({
        type: REORDER_TODO,
        payload: {
          destination,
          source,
          draggableId,
        },
      });
    } else {
      dispatch({
        type: REORDER_COLUMN,
        payload: {
          destination,
          source,
          draggableId,
        },
      });
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(addList(newListName));
    setNewListName('');
  };

  return (
    <div className='App'>
      <h1>Hello world!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Create new list'
          value={newListName}
          onChange={(evt) => setNewListName(evt.target.value)}
        />
      </form>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={uuid()} direction='horizontal' type='column'>
          {(provided) => (
            <div
              className='listsContainer'
              {...provided.droppableProps}
              ref={provided.innerRef}
              placeholder={provided.placeholder}
            >
              {state.lists.map((e, index) => {
                return (
                  <Draggable draggableId={e.id} index={index} key={e.id}>
                    {(provided) => (
                      <div
                        className='list-draggable'
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <List listInfo={e} key={index} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
