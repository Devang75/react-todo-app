import './App.css';
import store, { persistor } from './components/store/store';
import { TodoWrapper } from './components/TodoWrapper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App">
          <TodoWrapper />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
