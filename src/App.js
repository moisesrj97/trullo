import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { v4 as uuid } from 'uuid';

import List from './components/List';
import {
  DARKMODE_TOGGLE,
  REORDER_COLUMN,
  REORDER_TODO,
} from './constants/constants';
import { useEffect, useState } from 'react';
import { addList } from './actions/actionMaker';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

function App() {
  const [newListName, setNewListName] = useState('');
  const state = useSelector((state) => state);
  const darkMode = useSelector((state) => state.darkMode);
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

  const toggleDarkMode = () => {
    dispatch({ type: DARKMODE_TOGGLE });
  };

  return (
    <div className={darkMode ? 'App darkApp' : 'App'}>
      <nav>
        <h1 className={darkMode ? 'darkH1' : 'h1'}>
          This is <span className={darkMode ? 'darkSpan' : 'span'}>Trullo</span>
          !
        </h1>
        <DarkModeSwitch
          checked={darkMode}
          onChange={toggleDarkMode}
          size={30}
        />
      </nav>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Create new list'
            value={newListName}
            onChange={(evt) => setNewListName(evt.target.value)}
            className={darkMode ? 'darkNew-list-input' : 'new-list-input'}
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
      </main>
      <footer className={darkMode ? 'dark' : null}>
        <p>Made with 💜 by moisesrj97</p>
      </footer>
    </div>
  );
}

export default App;
