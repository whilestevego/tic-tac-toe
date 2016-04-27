import React from 'react';
import _ from 'lodash';

import Board from './board.jsx';
import {validateWin, initialGameState} from '../lib/tic-tac-toe.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialGameState();

    this.makeMove = this.makeMove.bind(this);
    this.togglePlayer = this.togglePlayer.bind(this);
    this.isGameOver = this.isGameOver.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  isGameOver() {
    return (
      !_.isEmpty(this.state.winningRow) ||
        _.every(this.state.grid, square => /x|o/.test(square))
    );
  }

  togglePlayer() {
    const toggle = player => ({x: 'o', o: 'x'})[player];

    this.setState(
      prevState => ({activePlayer: toggle(prevState.activePlayer)})
    );
  }

  makeMove(index) {
    const {grid, activePlayer} = this.state;

    // Prevent any other moves if a winning row is found
    if (!_.isEmpty(this.state.winningRow)) return;

    // Construct next turns grid
    const newGrid = grid;
    newGrid[index] = activePlayer;

    // Check for a win
    const winningRow = validateWin(newGrid);
    if (winningRow) {
      // Final update to the Board
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

  resetGame() {
    this.setState(initialGameState());
  }

  render() {
    const {grid, activePlayer, winningRow} = this.state;

    // TODO: Create as function in helper library
    const className = _([
      'game',
      this.isGameOver() ? 'game-over' : '',
      `player-${activePlayer}`
    ]).reject(_.isEmpty).join(' ').trim();

    const extraProps = {};
    if (this.isGameOver()) extraProps.onClick = this.resetGame;

    return (
      <section className={className}>
        <Board
          grid={grid}
          isGameOver={this.isGameOver()}
          winningRow={winningRow}
          onSelectSquare={this.makeMove}
          {...extraProps} />
      </section>
    );
  }
}
