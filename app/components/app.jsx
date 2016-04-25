import React from 'react';
import Grid from './grid.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.setMove = this.setMove.bind(this);
  }

  setMove(index) {
    this.setState(
      prevState => {
        const {grid, activePlayer} = prevState;
        grid[index] = activePlayer;
        return {grid};
      }
    );
  }

  togglePlayer() {
    const {activePlayer} = this.state;
    const toggle = player => ({x: 'o', o: 'x'})[player];

    this.setState(
      prevState => ({activePlayer: toggle(prevState.activePlayer)})
    );
  }

  makeMove(index) {
    this.setMove(index);
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
