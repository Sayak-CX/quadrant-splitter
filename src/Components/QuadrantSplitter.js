import React, {useState} from "react";

export default function Quadrant({ level = 0, width, height, style }) {

  const [isGrid, setIsGrid] = useState(false);               // Boolean bariable to determine if a box has been split
  const [position, setPosition] = useState({ x: 0, y: 0 })   // Object to hold the coordinates of where the split needs to occur

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()     // To get the dimensions of the element
    const XCoordinate = e.clientX - rect.left                // To get the exact coordinates of where the box needs to be split
    const YCoordinate = e.clientY - rect.top
    setPosition({x: XCoordinate, y: YCoordinate})
    setIsGrid(true);
  }

  function generateColour() {                                // function to generate random colours for each split quadrant
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  if (isGrid && position) {
    const { x, y } = position;
    const quadrants = [                                        // An array to hold the dimensions of each of the quadrants after splitting
      { width: x, height: y, top: 0, left: 0, backgroundColor: generateColour() },
      { width: width - x, height: y, top: 0, left: x, backgroundColor: generateColour() },
      { width: x, height: height - y, top: y, left: 0, backgroundColor: generateColour() },
      { width: width - x, height: height - y, top: y, left: x, backgroundColor: generateColour() },
    ];
    return (
      <div style={{ position: 'relative', width, height, ...style }}>
        {quadrants.map((q, index) => (                          // The component is being rendered recursively each time it is split
          <Quadrant
            key={index}
            level={level + 1}                                   // Additional property to keep track of the number of recursions for optimization
            width={q.width}
            height={q.height}
            style={{
              position: 'absolute',
              top: q.top,
              left: q.left,
              backgroundColor: q.backgroundColor,
              transition: 'all 0.3s ease-in-out'
            }}
          />
        ))}
      </div>
    );
  }

return (
  <div                                                          // properties of the initial box
    onClick={handleClick}
    style={{
      width,
      height,
      backgroundColor: 'gray',
      cursor: 'pointer',
      position: 'relative',
      transition: 'all 0.3s ease-in-out',
      ...style
    }}
  />
);
}