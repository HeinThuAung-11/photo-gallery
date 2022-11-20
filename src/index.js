import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore } from 'redux-persist';

// let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      {/* <PersistGate persistor={persistor}> */}
          <App />
      {/* </PersistGate> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


