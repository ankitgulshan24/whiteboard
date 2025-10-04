const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("./config/db");
const { Server } = require("socket.io");
const http = require("http");
const Canvas = require("./models/canvasModel");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "dev_fallback_secret";
const userRoutes = require("./routes/userRoutes");
const canvasRoutes = require("./routes/canvasRoutes");

const app = express();

// CORS setup
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://whiteboard-app.com",
  "https://www.whiteboard-app.com",
  "https://app.whiteboard-app.com",
  "http://ec2-13-204-63-107.ap-south-1.compute.amazonaws.com",
].filter(Boolean);

app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));
app.use(express.json());

//  Routes
app.use("/api/users", userRoutes);
app.use("/api/canvas", canvasRoutes);

connectToDB();

const server = http.createServer(app);

//  Socket.io with proper CORS
const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let canvasData = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinCanvas", async ({ canvasId }) => {
    try {
      //  Get token from socket.auth
      const authToken = socket.handshake?.auth?.token || "";
      if (!authToken.startsWith("Bearer ")) {
        setTimeout(() => {
          socket.emit("unauthorized", { message: "Access Denied: No Token" });
        }, 100);
        return;
      }

      const token = authToken.slice("Bearer ".length);
      const decoded = jwt.verify(token, SECRET_KEY);
      const userId = decoded.userId;

      const canvas = await Canvas.findById(canvasId);
      if (
        !canvas ||
        (String(canvas.owner) !== String(userId) &&
          !canvas.shared.map(String).includes(String(userId)))
      ) {
        setTimeout(() => {
          socket.emit("unauthorized", {
            message: "You are not authorized to join this canvas.",
          });
        }, 100);
        return;
      }

      socket.join(canvasId);
      console.log(`User ${socket.id} joined canvas ${canvasId}`);

      if (canvasData[canvasId]) {
        socket.emit("loadCanvas", canvasData[canvasId]);
      } else {
        socket.emit("loadCanvas", canvas.elements);
      }
    } catch (error) {
      console.error(error);
      socket.emit("error", {
        message: "An error occurred while joining the canvas.",
      });
    }
  });

  socket.on("drawingUpdate", async ({ canvasId, elements }) => {
    try {
      canvasData[canvasId] = elements;
      socket.to(canvasId).emit("receiveDrawingUpdate", elements);

      const canvas = await Canvas.findById(canvasId);
      if (canvas) {
        await Canvas.findByIdAndUpdate(
          canvasId,
          { elements },
          { new: true, useFindAndModify: false }
        );
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(` Server running on port ${PORT}`));
