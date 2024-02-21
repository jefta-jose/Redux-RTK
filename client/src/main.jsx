// main.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Assuming your main application component is App
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';

// Create the portal container directly in main.jsx
const portalContainer = document.createElement('div');
portalContainer.id = 'portal-container';
document.body.appendChild(portalContainer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <>
        <App />
        {ReactDOM.createPortal(null, portalContainer)}
      </>
    </Provider>
  </React.StrictMode>,
);
