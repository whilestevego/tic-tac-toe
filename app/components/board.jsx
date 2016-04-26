import React, {PropTypes} from 'react';
import _ from 'lodash';

import Square from './square.jsx';

export default function Board (props) {
  const {grid, winningRow} = props;

  const squares = _.map(
    grid,
    (square, index) => {
      const boundClick = props.onClick.bind({}, index);

      return (
        <Square
          key={index}
          onClick={boundClick}
          winner={_.includes(props.winningRow, index)}
          square={square} />
      );
    }
  );

  const className = _.join([
    'grid',
    _.isEmpty(winningRow) ? '' : 'game-over'
  ], ' ').trim();

  return (
    <section className={className}>
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

Board.defaultProps = {
  onClick: () => {}
};
