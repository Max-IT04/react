import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { Game } from './game'
import { store } from './store';
import './index.css'



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Game />
  </Provider>,
);
