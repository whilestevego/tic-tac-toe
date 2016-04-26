import React from 'react';
import _ from 'lodash';

import Board from './board.jsx';
import {validateWin} from '../lib/tic-tac-toe.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winningRow: [],
      activePlayer: 'x',
      grid: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
      score: {
        x: 0, y: 0
      }
    };

    this.makeMove = this.makeMove.bind(this);
    this.togglePlayer = this.togglePlayer.bind(this);
  }

  togglePlayer() {
    const toggle = player => ({x: 'o', o: 'x'})[player];

    this.setState(
      prevState => ({activePlayer: toggle(prevState.activePlayer)})
    );
  }

  makeMove(index) {
    const {grid, activePlayer} = this.state;

    // Prevent any other moves if winning row is found
    if (!_.isEmpty(this.state.winningRow)) return;

    // Construct next turns grid
    const newGrid = grid;
    newGrid[index] = activePlayer;

    // Check for a win
    const winningRow = validateWin(newGrid);
    if (winningRow) {
      this.setState({
        winningRow,
        grid: newGrid
      });
      return;
    }

    // Update grid
    this.setState({grid: newGrid});

    // Switch player
    this.togglePlayer();
  }

  render() {
    const {grid, activePlayer, winningRow} = this.state;

    return (
      <section>
        <h1>{`Player ${_.toUpper(activePlayer)}`}</h1>
        <Board grid={grid} winningRow={winningRow} onClick={this.makeMove} />
      </section>
    );
  }
}
