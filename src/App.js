import Quadrant from "./Components/QuadrantSplitter";
import './style.css'
import React, {useState} from "react";

export default function App() {
  const [isReset, setIsReset] = useState(false);

  const handleReset = () => {
    setIsReset(true);
    setTimeout(() => setIsReset(false), 0); // Brief delay to reset the state
  };
  return (
    <div className="box">
      <h2>Quadrant Splitter</h2>
      {!isReset && <Quadrant width={400} height={400} />}
      <button onClick={handleReset} className="button">
        Reset
      </button>
    </div>
  );
}
