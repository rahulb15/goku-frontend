import React from 'react';
import './grid.css'; // Import your CSS

const GridItem = () => {
    return (
      <div className="grid__item-container">
        <div className="grid__item"></div>
      </div>
    );
  };

  const Grid = () => {
    return (
      <div className="grid">
        {Array(32).fill(null).map((_, index) => (
          <GridItem key={index} />
        ))}
      </div>
    );
  };


const GridStyle = () => {
    return (
      <div className="App">
        {Array(7).fill(null).map((_, index) => (
          <Grid key={index} />
        ))}
      </div>
    );
  };
  

export default GridStyle;
