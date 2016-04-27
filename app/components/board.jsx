import React, {PropTypes} from 'react';
import _ from 'lodash';

import Square from './square.jsx';

export default function Board(props) {
  const {grid, winningRow, isGameOver} = props;

  const squares = _.map(
    grid,
    (square, index) => {
      const boundClick = props.onSelectSquare.bind({}, index);

      return (
        <Square
          key={index}
          onClick={boundClick}
          isWinner={_.includes(winningRow, index)}
          square={square} />
      );
    }
  );

  const extraProps = {};
  if (isGameOver) extraProps.onClick = props.onClick;

  return (
    <section {...extraProps} className="board">
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
  isGameOver: PropTypes.bool,
  winningRow: PropTypes.arrayOf(PropTypes.number),
  onSelectSquare: PropTypes.func,
  onClick: PropTypes.func
};

Board.defaultProps = {
  onSelectSquare: () => {}
};
