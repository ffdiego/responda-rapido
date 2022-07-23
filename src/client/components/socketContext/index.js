import { useState, useEffect } from "react";
import SocketContext from "Components/socket_context/context";

//       ^ initSockets is shown later on

export default function SocketProvider(props) {
  const [value, setValue] = useState({
    queueLength: 0,
    positionInLine: 0,
  });
  useEffect(() => initSockets({ setValue }), [initSockets]);
  // Note, we are passing setValue ^ to initSockets

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
}
