const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const CHAT_BOT = "ChatBot"; // Add this
// Listen for when the client connects via socket.io-client

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    const { message, username } = data;
    // socket.to(data.room).emit("receive_message", data);
    io.emit("receive_message", {
      message,
    });
  });

  socket.on("typing", (data) => socket.to(data.room).emit("typing", data));

  socket.on("stop_typing", (data) => socket.to(data.room).emit("stop_typing"));
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
