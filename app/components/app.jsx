import React from 'react';
import Grid from './grid.jsx';
import _ from 'lodash';

const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function selectIndexes(coll, indexes) {
  return _.filter(coll, (val, index) => _.includes(indexes, index));
}

function checkRow(row) {
  return /xxx|ooo/.test(row.join(''));
}

function validateWin(grid) {
  return _.find(WIN_CONDITIONS, indexes => checkRow(selectIndexes(grid, indexes)));
}

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
    if (winningRow) this.setState({winningRow});

    // Update grid
    this.setState({grid: newGrid});
    this.togglePlayer();
  }

  render() {
    const {grid, activePlayer} = this.state;

    return (
      <section>
        <h1>{`Player ${_.toUpper(activePlayer)}`}</h1>
        <Grid grid={grid} onClick={this.makeMove} />
      </section>
    );
  }
}
