const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.static("public"));
console.log(__dirname);

io.on("connection",(socket)=>{
  console.log("New connection");

  socket.emit("message","Welcome");
  socket.broadcast.emit("message","A new user joined");

  socket.on("sendMessage",(message)=>{
    io.emit("message",message);
    
  });

  socket.on("sendLocation",(coords)=>{
    io.emit("message",`https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
  });



});



server.listen(3000,()=>{
  console.log("server started on port 5000");
});
