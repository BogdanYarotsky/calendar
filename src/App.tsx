import { useState, useEffect } from 'react';
import './App.css';
import { range } from './range';

const getPercentage = (part: number, whole: number) => part / whole * 100;

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
const getTotalMinutes = (date: Date) => date.getHours() * MINUTES_IN_HOUR + date.getMinutes()
const getTotalSeconds = (date: Date) => getTotalMinutes(date) * SECONDS_IN_MINUTE + date.getSeconds()
const getCurrentDaySecond = () => getTotalSeconds(new Date());

type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
const weekdays: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface Event {
  weekday: Weekday;
  startHour: number;
  endHour: number;
}

const events: Event[] = [
  { weekday: "Monday", startHour: 3, endHour: 5 },
  { weekday: "Tuesday", startHour: 7, endHour: 9 },
  // Add more events...
];

const updateIntervalInMS = 1000;

const HourLine = ({ hour }: { hour: number }) =>
  <div className="hour-line" style={{ top: `${getPercentage(hour, HOURS_IN_DAY)}%` }}>{hour}</div>;

const MovingLine = ({ second }: { second: number }) =>
  <div className="moving-line" style={{ top: `${getPercentage(second, SECONDS_IN_DAY)}%` }}></div>


const EventBlock = ({ event }: { event: Event }) => {
  const top = getPercentage(event.startHour, HOURS_IN_DAY);
  const height = getPercentage(event.endHour - event.startHour, HOURS_IN_DAY);

  return (
    <div className="event-block" style={{ top: `${top}%`, height: `${height}%` }}>
      Event
    </div>
  );
};

export default function App() {
  const [currentSecond, setCurrentSecond] = useState(getCurrentDaySecond());
  const updateCurrentSecond = () => setCurrentSecond(getCurrentDaySecond());

  useEffect(() => {
    const timerID = setInterval(updateCurrentSecond, updateIntervalInMS);
    return () => clearInterval(timerID);
  }, []);

  return (
    <div className="container">
      <div className="weekday-container">
        {weekdays.map((weekday, i) => (
          <div key={i} className="weekday-column">
            <div className="weekday-header">{weekday}</div>
            <div className="event-container">
              {events
                .filter(event => event.weekday === weekday)
                .map((event, i) => (
                  <EventBlock key={i} event={event} />
                ))}
            </div>
          </div>
        ))}
      </div>
      {range(1, HOURS_IN_DAY).map(hour => <HourLine key={hour} hour={hour} />)}
      <MovingLine second={currentSecond} />
    </div>
  );
}