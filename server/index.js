import express from "express";
import {
  server,
  io,
} from "./socket/socket.js"; // Import io if needed
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

// Routes
import authRoutes from "./routes/auth-routes.js";
import messageRoutes from "./routes/message-route.js";
import usersRoutes from "./routes/users-route.js";

import connectDb from "./config/db.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// CORS configuration for Express
const corsOptions = {
  origin:
    "https://mg-mern-chatv1.onrender.com", // Allow this origin
  credentials: true, // Allow credentials if needed
};

// Use CORS middleware
const app = express();
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Route middlewares
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);

// Serve static files
app.use(
  express.static(
    path.join(__dirname, "/client/dist")
  )
);

// Handle all other routes
app.get("*", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "client",
      "dist",
      "index.html"
    )
  );
});

// Connect to the database
connectDb();

// Start the server
server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
