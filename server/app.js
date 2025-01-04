const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const startupRoutes = require("./routes/startupRoutes");
const governmentRoutes = require("./routes/governmentRoutes");
const documentRoutes = require("./routes/documentRoutes");
const statusRoutes = require("./routes/statusRoutes");
const investorRoutes = require("./routes/investorRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const Message = require("./models/Message");
const socketIo = require("socket.io");
require("dotenv").config();

// Connect to Database
connectDB();

const app = express();

// Create an HTTP server and pass the Express app to it
const server = http.createServer(app);

// Initialize Socket.io with the server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});
// Init Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  })
);
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", async ({ sender, receiver, content }) => {
    const message = new Message({ sender, receiver, content });
    await message.save();

    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(express.json());
app.use(cookieParser());

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/government", governmentRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/investor", investorRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/certificates", certificateRoutes);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
