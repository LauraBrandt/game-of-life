import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleCell } from '../actions/boardActions';
import '../styles/css/Gameboard.css';

export class Gameboard extends Component {
  render() {
    const { board, toggleCell } = this.props;

    return (
      <div className="gameboard">
        { board.map((row, i) => 
          <div className="board-row" key={i}>
            {row.map((cell, j) => 
              <div 
                className={`board-cell${cell ? ' active' : ''}`} 
                key={j} 
                onClick={toggleCell.bind(null, [i, j])}>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Gameboard.propTypes = {
  board: PropTypes.array.isRequired,
  toggleCell: PropTypes.func
}

const mapStateToProps = state => ({
  board: state.board.current
});

const mapDispatchToProps = dispatch => ({
  toggleCell: cell => dispatch(toggleCell(cell))
});

export default connect(mapStateToProps, mapDispatchToProps)(Gameboard);
