import { useEffect, useState } from "react";
import { BsStopwatch } from "react-icons/bs";

export function Clock() {
  const [time, setTime] = useState(30);
  const [clockPause, setClockPause] = useState(true);

  //useEffect(() => {
  //  console.log("clock registered");
  //  socket?.on("clockSet", (time) => {
  //    console.log("received clockSet", time);
  //    setTime(time);
  //  });
  //  socket?.on("clockPause", (bool) => {
  //    console.log("received bool", bool, "to change clock status");
  //    setClockPause(bool);
  //  });
  //
  //  () => {
  //    socket?.off("clockSet");
  //    socket?.off("clockPause");
  //  };
  //}, [socket]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!clockPause && time > 0) setTime(time - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [clockPause, time]);

  return (
    <div className="text-2xl flex items-center gap-2">
      <p
        key={time}
        className={`animalHappy ${time < 10 ? "text-red-500" : ""}`}
      >
        {time.toString().padStart(2, "0")}
      </p>
      <BsStopwatch />
    </div>
  );
}
