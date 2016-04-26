import React from 'react';
import _ from 'lodash';

export default function Square({square, onClick, winner}) {
  const extraProps = {};

  if (square === ' ') extraProps.onClick = onClick;
  extraProps.className = _.join([
    'square',
    square,
    winner ? 'winner' : ''
  ], ' ').trim();

  return (
    <div {...extraProps}>
      {square}
    </div>
  );
}

Square.defaultProps = {
  onClick: () => {}
};
