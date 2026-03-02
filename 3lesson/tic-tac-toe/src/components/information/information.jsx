import { useReduxState } from '../../redux-manager';
import { PLAYER_ACTION, PLAYER_NAME, STATUS } from '../../constants';
import { InformationLayout } from './information-layout';

export const Information = () => {
  const { status, currentPlayer } = useReduxState();

  const playerAction = PLAYER_ACTION[status];
  const playerName = PLAYER_NAME[currentPlayer];

  const information = 
    status === STATUS.DRAW ? 'Ничья' : `${playerAction}: ${playerName}`; 

  return <InformationLayout information={information}/>;
};
