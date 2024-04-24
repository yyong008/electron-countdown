import { useState } from "react";
import "./App.css";
import { NavBar, CountDownSetting, CountDown, Reset } from "./components";

function App() {
  const [status, setStatus] = useState(0);
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  return (
    <>
      <div className="container">
        <NavBar />
        {status === 0 ? (
          <CountDownSetting status={status} setStatus={setStatus}  setTime={setTime} />
        ) : null}
        {status === 1 ? <CountDown setStatus={setStatus} time={time} /> : null}
        {status === 2 ? <Reset setStatus={setStatus} /> : null}
      </div>
    </>
  );
}

export default App;
