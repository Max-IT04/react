import { Component } from 'react';
import PropTypes from 'prop-types';
import { Information, Field } from './components';
// import styles from './game.module.css';

export class GameLayout extends Component {
    render() { 
      return (
      <div className="flex flex-col items-center max-w-xs my-12 mx-auto">
        <Information />
        <Field />
        <button 
          className="text-sm bg-gray-100 border border-black rounded px-1.5"
          onClick={this.props.handleRestart}
        >
          Начать заново
        </button>
      </div>
    )
  }
};

GameLayout.propTypes = {
  handleRestart: PropTypes.func, 
};