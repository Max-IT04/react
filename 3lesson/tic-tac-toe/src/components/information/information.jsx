import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PLAYER, PLAYER_ACTION, PLAYER_NAME, STATUS } from '../../constants';
import { selectCurrentPlayer, selectStatus } from '../../selectors';
import { InformationLayout } from './information-layout';

export class InformationContainer extends Component {
  render() {
    const { status, currentPlayer } = this.props;

    const playerAction = PLAYER_ACTION[status];
    const playerName = PLAYER_NAME[currentPlayer];

    const information = 
      status === STATUS.DRAW ? 'Ничья' : `${playerAction}: ${playerName}`; 

    return <InformationLayout information={information}/>;
  }
};

const mapStateToProps = (state) => ({
  status: selectStatus(state),
  currentPlayer: selectCurrentPlayer(state),
});

export const Information = connect(mapStateToProps)(InformationContainer);

InformationContainer.propTypes = {
  status: PropTypes.oneOf(Object.values(STATUS)).isRequired,
  currentPlayer: PropTypes.oneOf(Object.values(PLAYER)).isRequired
};

