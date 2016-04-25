import React from 'react';
import _ from 'lodash';

export default function Grid (props) {
  const {grid} = props;

  return (
    <section className="grid">
      {
        _.map(grid, (square, index) =>
              <div key={index} className="square">{square}</div>)
      }
    </section>
  );
}
