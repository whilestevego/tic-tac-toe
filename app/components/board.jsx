import React, {PropTypes} from 'react';
import _ from 'lodash';

import Square from './square.jsx';

export default function Board(props) {
  const {grid, winningRow} = props;

  const squares = _.map(
    grid,
    (square, index) => {
      const boundClick = props.onClick.bind({}, index);

      return (
        <Square
          key={index}
          onClick={boundClick}
          isWinner={_.includes(winningRow, index)}
          square={square} />
      );
    }
  );

  return (
    <section className="board">
      {
        _(squares).chunk(3).map(
          (squareRow, index) => (
            <section
              key={index}
              className="row">
              {squareRow}
            </section>
            )
        ).value()
      }
    </section>
  );
}

Board.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.string),
  winningRow: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func
};

Board.defaultProps = {
  onClick: () => {}
};
