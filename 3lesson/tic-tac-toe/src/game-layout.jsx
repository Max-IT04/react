import PropTypes from 'prop-types';
import { Information, Field } from './components';
import styles from './game.module.css';

export const GameLayout = ({ handleRestart }) => (
  <div className={styles.game}>
    <Information />
    <Field />
    <button className={styles.restartButton} onClick={handleRestart}>
      Начать заново
    </button>
  </div>
);

GameLayout.propTypes = {
  handleRestart: PropTypes.func, 
};