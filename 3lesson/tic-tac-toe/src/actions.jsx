export const ACTION_TYPE = {
  SET_FIELD: 'SET_FIELD', 
  SET_STATUS: 'SET_STATUS',
  SET_CURRENT_PLAYER: 'SET_CURRENT_PLAYER',
  RESTART_GAME: 'RESTART_GAME',
};

export const setField = (field) => ({
  type: ACTION_TYPE.SET_FIELD,
  payload: field,
});

export const setStatus = (status) => ({
  type: ACTION_TYPE.SET_STATUS,
  payload: status,
});

export const setCurrentPlayer = (currentPlayer) => ({
  type: ACTION_TYPE.SET_CURRENT_PLAYER,
  payload: currentPlayer,
});

export const RESTART_GAME = {
  type: ACTION_TYPE.RESTART_GAME,
};