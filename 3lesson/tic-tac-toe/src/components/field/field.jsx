import PropTypes from 'prop-types';
import { PLAYER } from '../../constants';
import { FieldLayout } from './field-layout';

export const Field = ({ field, handleCellClick }) => {
  return <FieldLayout field={field} handleCellClick={handleCellClick} />;
};

Field.propTypes = {
  field: PropTypes.arrayOf(
    PropTypes.oneOf([PLAYER.CROSS, PLAYER.NOUGHT, PLAYER.NOBODY]),
  ),
  handleCellClick: PropTypes.func, 
};