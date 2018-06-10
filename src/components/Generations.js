import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/css/Generations.css';

export class Generations extends Component {
  render() {
    return (
      <div className="generations">
        Generation: <span>{this.props.generation}</span>
      </div>
    );
  }
}

Generations.propTypes = {
  generation: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  generation: state.generation
});

export default connect(mapStateToProps)(Generations);
