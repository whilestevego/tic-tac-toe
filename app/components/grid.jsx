import React from 'react';
import _ from 'lodash';

import Square from './square.jsx';

export default function Grid (props) {
  const {grid} = props;

  const squares = _.map(
    grid,
    (square, index) => {
      const boundClick = props.onClick.bind({}, index);

      return (
        <Square
          key={index}
          onClick={boundClick}
          square={square} />
      );
    }
  );

  return (
    <section className="grid">
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

Grid.propTypes = {
  onClick: () => {}
};
