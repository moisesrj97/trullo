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
      <DragDropContext onDragEnd={onDragEnd}>
        <List listInfo={state.lists[0]} />
      </DragDropContext>
    </div>
  );
}

export default App;
