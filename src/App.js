import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const startStop = () => {
    setRunning(prevRunning => !prevRunning);
  };

  const reset = () => {
    setTime(0);
    setRunning(false);
    setLaps([]);
  };

  const lap = () => {
    setLaps(prevLaps => [...prevLaps, time]);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time / 6000) % 60);
    const seconds = Math.floor((time / 100) % 60);
    const milliseconds = time % 100;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milliseconds < 10 ? '0' : ''}${milliseconds}`;
  };

  return (
    <div className="container">
      <h1 className="mt-5">Stopwatch</h1>
      <div className="stopwatch mb-4">{formatTime(time)}</div>
      <div className="buttons">
        <button className="btn btn-primary mr-2" onClick={startStop}>{running ? 'Stop' : 'Start'}</button>
        <button className="btn btn-danger mr-2" onClick={reset}>Reset</button>
        <button className="btn btn-success" onClick={lap} disabled={!running && time === 0}>Lap</button>
      </div>
      {laps.length > 0 && (
        <div className="laps">
  <h2>Laps</h2>
  {laps.map((lap, index) => (
    <div className="lap-item" key={index}>{formatTime(lap)}</div>
  ))}
</div>
      )}
    </div>
  );
}

export default App;
