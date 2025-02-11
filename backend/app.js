//...................................Core Components
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const todoRouter = require("./routes/todoRouter");
require('dotenv').config();
const cors = require("cors");
const {Server} = require("socket.io");
const http = require("http");
const server = http.createServer(app); //creating a http server 

const io = new Server(server, {
  cors: {
      origin: "http://localhost:5173",
      credentials: true
  }
});


const users = new Map(); // { userId: socketId }

// Track user connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("LogginUser", (userId) => {
    users.set(userId,socket.id); // Store userId with socketId
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(users).find((key) => users[key] === socket.id);
    if (userId) {
      users.delete(userId); // Remove user on disconnect
      console.log(`User ${userId} disconnected`);
    }
  });
});


//..................................Middleware's setup
app.use((req, res, next) => {
    console.log("----request.method :", req.method);
    console.log("----request.url :"   , req.url); 
    next();
  });

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next)=>{
    req.io = io;
    req.users = users;
    next();
})
app.use(todoRouter);

//.............................App initialization
server.listen(7000,(err,data)=>{
    if(err)
        console.log("Server is not connected!!");
    else{
        console.log("Server is connected at port 7000");
    }
}) 