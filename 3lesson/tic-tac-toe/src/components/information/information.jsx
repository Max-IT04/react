import { useSelector } from 'react-redux';
import { PLAYER_ACTION, PLAYER_NAME, STATUS } from '../../constants';
import { selectCurrentPlayer, selectStatus } from '../../selectors';
import { InformationLayout } from './information-layout';

export const Information = () => {
  const status = useSelector(selectStatus);selectStatus
  const currentPlayer = useSelector(selectCurrentPlayer);

  const playerAction = PLAYER_ACTION[status];
  const playerName = PLAYER_NAME[currentPlayer];

  const information = 
    status === STATUS.DRAW ? 'Ничья' : `${playerAction}: ${playerName}`; 

  return <InformationLayout information={information}/>;
};
