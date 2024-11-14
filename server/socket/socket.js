import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

// Create an Express app
const app = express();
const server = createServer(app);

// Socket.IO server setup with CORS
const io = new Server(server, {
  cors: {
    origin:
      "https://mg-mern-chatv1.onrender.com", // Allow this origin
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials if needed
  },
});

// User socket mapping
const userSocketMap = {};
export const getReceiverSocketId = (
  receiverId
) => {
  return userSocketMap[receiverId];
};

// Handle socket connections
io.on("connection", (socket) => {
  console.log(
    `A user connected: ${socket.id}`
  );

  const userId =
    socket.handshake.query.userId;
  if (userId !== "undefined")
    userSocketMap[userId] = socket.id;

  io.emit(
    "getOnlineUsers",
    Object.keys(userSocketMap)
  );

  socket.on("disconnect", () => {
    console.log(
      `User  disconnected: ${socket.id}`
    );
    delete userSocketMap[userId];
    io.emit(
      "getOnlineUsers",
      Object.keys(userSocketMap)
    );
  });
});

export { io, server, app };
