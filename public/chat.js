console.log("client side");
const messages = document.querySelector("#messages");
const message_template = document.querySelector("#message-template").innerHTML;

const socket = io();
socket.on("message",(message)=>{
  console.log(message);
  const html = Mustache.render(message_template,{message:message});
  messages.insertAdjacentHTML("beforeend",html);
});

document.querySelector("form").addEventListener("submit",(e)=>{
  e.preventDefault();
  document.querySelector(".text").setAttribute("disabled","disabled");
  const message = document.querySelector("input").value;
  socket.emit("sendMessage",message);
  document.querySelector(".text").removeAttribute("disabled");
  document.querySelector("input").value="";
});

document.querySelector(".btn").addEventListener("click",()=>{
  if(!navigator.geolocation){
    return alert("Browser does not support geolocation");
  }

  document.querySelector(".btn").setAttribute("disabled","disabled")

  navigator.geolocation.getCurrentPosition(position=>{
    socket.emit("sendLocation",{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
    document.querySelector(".btn").removeAttribute("disabled");
  });
});
