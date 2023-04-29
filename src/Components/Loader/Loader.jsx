import React, { useState, useEffect } from "react";
import "./Loader.css";

const Loader = () => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const startTimestamp = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimestamp;
      const newProgress = Math.floor((elapsed / 5000) * 101); // Change the 5000 to adjust the total duration
      setProgress(newProgress <= 101 ? newProgress : 100);
    }, 10); // Change the interval duration (in milliseconds) to adjust the smoothness of the animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-component">
      <div className="loading-bar" style={{ width: `${progress}%` }}></div>
      <div className="loading-count">{progress}%</div>
    </div>
  );
};

export default Loader;
