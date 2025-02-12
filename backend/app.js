const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const todoRouter = require("./routes/todoRouter");
require('dotenv').config();
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
<<<<<<< HEAD
      origin: "http://localhost:5173",
      credentials: true
  }
=======
    origin: "http://localhost:5173",
    credentials: true,
  },
>>>>>>> 16cf041b96126686e18feff0dc8a35414a49823c
});


const users = new Map(); // { userId: socketId }

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("LogginUser", (userId) => {
<<<<<<< HEAD
    users.set(userId,socket.id); // Store userId with socketId
=======
    users[userId] = socket.id;
>>>>>>> 16cf041b96126686e18feff0dc8a35414a49823c
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(users).find((key) => users[key] === socket.id);
    if (userId) {
<<<<<<< HEAD
      users.delete(userId); // Remove user on disconnect
=======
      delete users[userId];
>>>>>>> 16cf041b96126686e18feff0dc8a35414a49823c
      console.log(`User ${userId} disconnected`);
    }
  });
});

// Middleware to attach io and users object to req
app.use((req, res, next) => {
  req.io = io;
  req.users = users;
  next();
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use((req,res,next)=>{
    req.io = io;
    req.users = users;
    next();
})
=======

>>>>>>> 16cf041b96126686e18feff0dc8a35414a49823c
app.use(todoRouter);

server.listen(7000, (err) => {
  if (err) console.log("Server failed to start.");
  else console.log("Server running on port 7000.");
});
