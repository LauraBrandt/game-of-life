import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tick, setRandom, setPattern, clearBoard } from '../actions/boardActions';
import { incrementGeneration, resetGeneration } from '../actions/generationActions';
import '../styles/css/Controller.css';

import patterns from '../startPatterns';

class Controller extends Component {
  constructor() {
    super();

    this.state = {
      timer: null,
      isPlaying: false,
      dropdownOpen: false,
    }

    this.togglePlay = this.togglePlay.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.clear = this.clear.bind(this);
    this.randomize = this.randomize.bind(this);
    this.setPattern = this.setPattern.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  togglePlay() {
    if (this.state.isPlaying) {
      clearInterval(this.state.timer);
    } else {
      this.startTimer();
    }
    this.setState( prevState => ({ isPlaying: !prevState.isPlaying }) );
  }

  startTimer() {
    const timer = setInterval(() => {
      this.props.tick();
      this.props.incrementGeneration();
    }, 250);
    this.setState({ timer });
  }

  clear() {
    clearInterval(this.state.timer);
    this.setState({ isPlaying: false });
    this.props.clearBoard();
    this.props.resetGeneration();
  }

  randomize() {
    clearInterval(this.state.timer);
    this.setState({ isPlaying: false });
    this.props.resetGeneration();
    this.props.randomize();
  }

  setPattern(cells) {
    clearInterval(this.state.timer);
    this.setState({ isPlaying: false });
    this.props.resetGeneration();
    this.props.setPattern(cells);
  }

  toggleDropdown() {
    this.setState(prevState => ({dropdownOpen: !prevState.dropdownOpen}));
  }

  componentDidMount() {
    this.randomize();
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    return (
      <div className="controller">
        <div className="controller-generation">Generation: <span>{this.props.generation}</span></div>
        <hr/>
        <div className="controller-controls">
          <p>Controls</p>
          <button className="controller-button controller-toggle-play" onClick={this.togglePlay}>
            {this.state.isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className="controller-button controller-clear" onClick={this.clear}>
            Clear Board
          </button>
        </div>
        <hr/>
        <div className="controller-start-config">
          <p>Choose a starting configuration (or click the squares on the board to make your own)</p>
          <button className="controller-button controller-random" onClick={this.randomize}>
            Random
          </button>
          <div className="controller-patterns">
            <button className="controller-button controller-pattern-dropdown" onClick={this.toggleDropdown}>
              Patterns &#9662;
            </button>
            {this.state.dropdownOpen &&
              <ul className="controller-pattern-dropdown-list"> 
                {patterns.map(pattern => 
                  <li key={pattern.code} className="controller-dropdown-element">
                    <button className="controller-dropdown-button" onClick={this.setPattern.bind(null, pattern.cells)}>
                      {pattern.name}
                    </button>
                  </li>
                )}
              </ul>
            }
          </div>
        </div>
      </div>
    );
  }
}

Controller.propTypes = {
  generation: PropTypes.number.isRequired,
  tick: PropTypes.func.isRequired,
  randomize: PropTypes.func.isRequired,
  setPattern: PropTypes.func.isRequired,
  clearBoard: PropTypes.func.isRequired,
  incrementGeneration: PropTypes.func.isRequired,
  resetGeneration: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  generation: state.generation
});

const mapDispatchToProps = dispatch => ({
  randomize: () => dispatch(setRandom()),
  setPattern: pattern => dispatch(setPattern(pattern)),
  tick: () => dispatch(tick()),
  clearBoard: () => dispatch(clearBoard()),
  incrementGeneration: () => dispatch(incrementGeneration()),
  resetGeneration: () => dispatch(resetGeneration()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
