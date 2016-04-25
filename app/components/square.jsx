import React from 'react';

export default function Square(props) {
  return (
    <div
      onClick={props.onClick}
      className="square">
      {props.square}
    </div>
  );
}

Square.defaultProps = {
  onClick: () => {}
};
