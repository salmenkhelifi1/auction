import { io } from "socket.io-client";
const userId =
  typeof window !== "undefined" ? localStorage.getItem("userId") : null;

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  query: { userId },
});

export default socket;
