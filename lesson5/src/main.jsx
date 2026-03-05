import React from 'react';
import { createRoot } from 'react-dom/client'
import { App, initialState } from './app'
import { StateManager } from './state-manager.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StateManager initialState={initialState} >
    <App />
  </StateManager>,
);