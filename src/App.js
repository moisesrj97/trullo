import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';

import List from './components/List';
import { REORDER_TODO } from './constants/constants';

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    dispatch({
      type: REORDER_TODO,
      payload: {
        destination,
        source,
        draggableId,
      },
    });
  };

  return (
    <div className='App'>
      <h1>Hello world!</h1>
      <div className='listsContainer'>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.lists.map((e, index) => {
            return <List listInfo={e} key={index} />;
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
