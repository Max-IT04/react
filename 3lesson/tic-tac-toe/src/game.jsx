import { useState } from 'react';
import PropTypes from 'prop-types';
import { GameLayout } from './game-layout';
import { handleCellClick, handleRestart } from './handlers';
import { createEmptyField } from './utils';
import { STATUS, PLAYER } from './constants';

export const Game = () => {
  const [status, setStatus] = useState(STATUS.TURN);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER.CROSS);
  const [field, setField] = useState(createEmptyField());

  const state = { status, setStatus, currentPlayer, setCurrentPlayer, field, setField };

  return ( 
    <GameLayout 
      status={status} 
      currentPlayer={currentPlayer} 
      field={field} 
      handleCellClick={(cellIndex) => handleCellClick(state, cellIndex)} 
      handleRestart={() => handleRestart(state)}
    /> 
  );
};