import { createEmptyField } from '../utils';
import { STATUS, PLAYER } from '../constants';

export const handleRestart = ({ setStatus, setCurrentPlayer, setField }) => {
    setStatus(STATUS.TURN);
    setCurrentPlayer(PLAYER.CROSS);
    setField(createEmptyField());
  };