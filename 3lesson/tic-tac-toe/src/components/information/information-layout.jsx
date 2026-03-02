import PropTypes from 'prop-types';

export const InformationLayout = ({ information }) => <div>{information}</div>;

InformationLayout.propTypes = {
  information: PropTypes.string,
  
};