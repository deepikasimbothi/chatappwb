import express from "express";
import {
  app,
  server,
} from "./socket/socket.js"; // Import io if needed
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

// Routes
import authRoutes from "./routes/auth-routes.js";
import messageRoutes from "./routes/message-route.js";
import usersRoutes from "./routes/users-route.js";
import connectDb from "./config/db.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

// Use CORS middleware

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Route middlewares
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);

// Serve static files
if(process.env.NODE_ENV !== "development"){
  app.use(express.static(path.join(__dirname, "./client/dist")));
}

// Handle all other routes
app.all("*", (_req , res) => {
  if (process.env.NODE_ENV === "development") {
    res.status(200).send({ message: "Welcome to Synchronous Chat!" });
  } else {
    res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
  }
});

console.log(__dirname)
// Connect to the database
connectDb();

// Start the server
server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
