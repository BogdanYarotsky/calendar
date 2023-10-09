import { useState, useEffect } from 'react';
import './App.css';

// array
const range = (n: number) => Array.from({ length: n }, (_, i) => i);

// math
const getPercentage = (part: number, whole: number) => part / whole * 100;

// time
const hoursInDay = 24;
const minutesInHour = 60;
const secondsInMinute = 60;
const secondsInDay = hoursInDay * minutesInHour * secondsInMinute;
const getTotalMinutes = (date: Date) => date.getHours() * minutesInHour + date.getMinutes()
const getTotalSeconds = (date: Date) => getTotalMinutes(date) * secondsInMinute + date.getSeconds()
const getCurrentDaySecond = () => getTotalSeconds(new Date());

const updateIntervalInMS = 1000;

const HourLine = ({ hour }: { hour: number }) =>
  <div className="hour-line" style={{ top: `${getPercentage(hour, hoursInDay)}%` }}>{hour}</div>;

const MovingLine = ({ second }: { second: number }) =>
  <div className="moving-line" style={{ top: `${getPercentage(second, secondsInDay)}%` }}></div>

const App = () => {
  const [currentSecond, setCurrentSecond] = useState(getCurrentDaySecond());
  const updateCurrentSecond = () => setCurrentSecond(getCurrentDaySecond());

  useEffect(() => {
    const timerID = setInterval(updateCurrentSecond, updateIntervalInMS);
    return () => clearInterval(timerID);
  }, []);

  return (
    <div className="container">
      {range(hoursInDay).map(hour => <HourLine key={hour} hour={hour} />)}
      <MovingLine second={currentSecond} />
    </div>
  );
};

export default App;
