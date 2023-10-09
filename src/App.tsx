import { useState, useEffect } from 'react';
import './App.css';

const HourLines = () => {
  const lines = [];
  for (let i = 0; i < 24; i++) {
    const position = (i / 24) * 100;
    lines.push(
      <div
        key={i}
        className="hour-line"
        style={{ top: `${position}%` }}
      >
        {i}
      </div>
    );
  }
  return <>{lines}</>;
};

const App = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
      const currentSeconds = currentTime.getSeconds();
      const totalSeconds = ((currentHour * 3600) + (currentMinutes * 60) + currentSeconds);
      const percentage = (totalSeconds / 86400) * 100; // 86400 seconds in a day
      setPosition(percentage);
    };

    updatePosition();
    const timerID = setInterval(updatePosition, 1000); // Update every second

    return () => clearInterval(timerID);
  }, []);

  return (
    <div className="container">
      <HourLines />
      <div className="moving-line" style={{ top: `${position}%` }}></div>
    </div>
  );
};

export default App;
