import React from 'react';
import Grid from './grid.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePlayer: 'x',
      grid: [
        'o', ' ', ' ',
        ' ', 'x', ' ',
        ' ', ' ', ' '
      ],
      score: {
        x: 0, y: 0
      }
    };
  }

  render() {
    return (
      <section>
        <Grid grid={this.state.grid} />
      </section>
    );
  }
}
