import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import CurrencyConverter from './components/CurrencyConverter';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CurrencyConverter />
      </div>
    </Provider>
  );
}

export default App;