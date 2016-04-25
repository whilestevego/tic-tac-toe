import React from 'react';
import _ from 'lodash';

import Square from './square.jsx';

export default function Grid (props) {
  const {grid} = props;

  return (
    <section className="grid">
      {
        //TODO: Create function or component generation here
        _.map(
          _.chunk(grid, 3),
          squares =>
          <section className='row'>
            {
              _.map(
                squares,
                (square, index) => <Square key={index} square={square} />)
            }
          </section>
          )
      }
    </section>
  );
}
