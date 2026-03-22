import { Component } from 'react';
import PropTypes from 'prop-types';
import { PLAYER, PLAYER_SIGN } from '../../constants';
// import styles from './field.module.css'

export class FieldLayout extends Component {
  render() { 
    const { field, handleCellClick } = this.props;

    return (
      <div className="grid grid-cols-3 my-5 border border-black">
        {field.map((cellPlayer, index) => (
          <button 
            key={index} 
            className="bg-gray-100 w-24 h-24 border border-black text-5xl"
            onClick={() => handleCellClick(index)}
          >
            {PLAYER_SIGN[cellPlayer]}
          </button>
        ))}
      </div>
    )
  }
}

FieldLayout.propTypes = {
  field: PropTypes.arrayOf(PropTypes.oneOf(Object.values(PLAYER))),
  handleCellClick: PropTypes.func,
};