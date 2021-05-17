import React from 'react';
import ColorContext from '../context/color';

const ColorBox = () => {
  return (
    <ColorContext.Consumer>
      {value => (
        <div
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: value.color
          }}
        />
      )}
    </ColorContext.Consumer>
  );
};

export default ColorBox;
