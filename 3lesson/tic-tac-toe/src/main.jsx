import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Game } from './game'
import { ReduxRenderer } from './redux-manager';
import { store } from './store';
import './index.css'



createRoot(document.getElementById('root')).render(
  <ReduxRenderer store={store}>
    <Game />
  </ReduxRenderer>,
);
