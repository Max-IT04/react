import PropTypes from 'prop-types';
import { PLAYER_ACTION, PLAYER_NAME, STATUS, PLAYER } from '../../constants';
import { InformationLayout } from './information-layout';

export const Information = ({ status, currentPlayer }) => {
  const playerAction = PLAYER_ACTION[status];
  const playerName = PLAYER_NAME[currentPlayer];

  const information = 
    status === STATUS.DRAW ? 'Ничья' : `${playerAction}: ${playerName}`; 

  return <InformationLayout information={information}/>;
};

Information.propTypes = {
  status: PropTypes.oneOf([STATUS.DRAW, STATUS.TURN, STATUS.WIN]),
  currentPlayer: PropTypes.oneOf([PLAYER.CROSS, PLAYER.NOUGHT, PLAYER.NOBODY]),
};