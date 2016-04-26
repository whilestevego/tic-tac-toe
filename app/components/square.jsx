import React, {PropTypes} from 'react';
import _ from 'lodash';

export default function Square({square, onClick, isWinner}) {
  const extraProps = {};

  if (square === ' ') extraProps.onClick = onClick;
  extraProps.className = _.join([
    'square',
    square,
    isWinner ? 'is-winner' : ''
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
