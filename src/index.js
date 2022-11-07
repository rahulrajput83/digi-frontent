/* Imports */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';

/* Save Data from localStorage to redux. */
const loadData = () => {
  try {
    const user = localStorage.getItem("userData");
    if (user === null) return {};
    return {user: JSON.parse(user)}
  }
  catch{
    return {}
  }
}

/* Create store. */
const store = createStore(reducer, loadData());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);