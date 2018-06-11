import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tick, back, setRandom, setPattern, clearBoard } from '../actions/boardActions';
import { incrementGeneration, decrementGeneration, resetGeneration } from '../actions/generationActions';
import '../styles/css/Controller.css';
import patterns from '../startPatterns';

export class Controller extends Component {
  constructor() {
    super();

    this.state = {
      timer: null,
      isPlaying: false,
      dropdownOpen: false,
      patterns: []
    }

    this.togglePlay = this.togglePlay.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.clear = this.clear.bind(this);
    this.randomize = this.randomize.bind(this);
    this.setPattern = this.setPattern.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
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
    this.setState({ patterns });
    this.randomize();
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  goBack() {
    this.props.back();
    this.props.decrementGeneration();
  }

  goForward() {
    this.props.tick();
    this.props.incrementGeneration();
  }

  render() {
    return (
      <div className="controller">
        <div className="controller-controls">
          <p>Controls</p>
          <button className="controller-button" onClick={this.togglePlay}>
            {this.state.isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className="controller-button" onClick={this.clear}>
            Clear
          </button>
          <div className="arrows">
            <button className="arrow arrow-left" onClick={this.goBack}>&#9664;</button>
            <p>Move 1 generation</p>
            <button className="arrow arrow-right" onClick={this.goForward}>&#9654;</button>
          </div>
        </div>
        
        <div className="controller-start-config">
          <p>Choose a starting configuration: <br/><span>(or click the squares on the board to make your own)</span></p>
          <button className="controller-button" onClick={this.randomize}>
            Random
          </button>
          <div className="controller-patterns">
            <button className="controller-button controller-pattern" onClick={this.toggleDropdown}>
              Patterns &#9662;
            </button>
            {this.state.dropdownOpen &&
              <ul className="controller-pattern-dropdown"> 
                {this.state.patterns.map(pattern => 
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
  tick: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  randomize: PropTypes.func.isRequired,
  setPattern: PropTypes.func.isRequired,
  clearBoard: PropTypes.func.isRequired,
  incrementGeneration: PropTypes.func.isRequired,
  decrementGeneration: PropTypes.func.isRequired,
  resetGeneration: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  randomize: () => dispatch(setRandom()),
  setPattern: pattern => dispatch(setPattern(pattern)),
  tick: () => dispatch(tick()),
  back: () => dispatch(back()),
  clearBoard: () => dispatch(clearBoard()),
  incrementGeneration: () => dispatch(incrementGeneration()),
  decrementGeneration: () => dispatch(decrementGeneration()),
  resetGeneration: () => dispatch(resetGeneration()),
});

export default connect(null, mapDispatchToProps)(Controller);
