import React, { Component } from 'react';
import Generations from './components/Generations';
import Gameboard from './components/Gameboard';
import Controller from './components/Controller';
import './styles/css/App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Conway's Game of Life</h1>
        </header>
        <main className="app-main">
          <Generations />
          <Gameboard/>
          <Controller/>
        </main>
        <footer className="app-footer">
          <p>Designed and coded by <a href="https://github.com/LauraBrandt">Laura Brandt</a> as part of the <a href="https://learn.freecodecamp.org/coding-interview-prep/take-home-projects/build-the-game-of-life/">FreeCodeCamp</a> curriculum.</p>
        </footer>
      </div>
    );
  }
}

export default App;
