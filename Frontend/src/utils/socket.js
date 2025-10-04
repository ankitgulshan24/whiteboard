// import { io } from "socket.io-client";

// const token = localStorage.getItem("whiteboard_user_token");

// const socket = io("https://api-whiteboard-az.onrender.com", {
//   extraHeaders: token ? { Authorization: `Bearer ${token}` } : {}, // Only send if token exists
// });

// export default socket;

// import { io } from "socket.io-client";

// const token = localStorage.getItem("whiteboard_user_token");

// // Read from .env
// const SOCKET_URL = process.env.REACT_APP_WS_URL;

// const socket = io(SOCKET_URL, {
//   transports: ["websocket"], // better behind AWS LB
//   extraHeaders: token ? { Authorization: `Bearer ${token}` } : {},
// });

// export default socket;

import { io } from "socket.io-client";

const token = localStorage.getItem("whiteboard_user_token") || "";
const SOCKET_URL = process.env.REACT_APP_WS_URL;

const socket = io(SOCKET_URL, {
  transports: ["websocket"], // best for AWS / prod
  auth: token ? { token: `Bearer ${token}` } : {}, // browsers can't send headers directly
});

export default socket;


