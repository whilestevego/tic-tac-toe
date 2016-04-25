import React from 'react';

export default function Square({square, onClick}) {
  const extraProps = {};
  if (square === ' ') extraProps.onClick = onClick;

  return (
    <div
      {...extraProps}
      className="square">
      {square}
    </div>
  );
}

Square.defaultProps = {
  onClick: () => {}
};
