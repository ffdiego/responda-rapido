import { useEffect, useState } from "react";
import { BsStopwatch } from "react-icons/bs";
import { Socket } from "socket.io-client";
import { InterServerEvents } from "../../../server/events/IEvents";

export function Clock({
  socket,
}: {
  socket: Socket<InterServerEvents> | null;
}) {
  const [time, setTime] = useState(30);
  const [clockPause, setClockPause] = useState(true);

  useEffect(() => {
    console.log("clock registered");
    socket?.on("clockSet", (time) => {
      console.log("received clockSet", time);
      setTime(time);
    });
    socket?.on("clockPause", (bool) => {
      setClockPause(bool);
    });

    () => {
      socket?.off("clockSet");
      socket?.off("clockPause");
    };
  }, [socket]);

  useEffect(() => {
    const timer = setInterval(() => {
      //console.log("rodou, pausado", clockPause);
      if (!clockPause && time > 0) setTime(time - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [time]);

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
