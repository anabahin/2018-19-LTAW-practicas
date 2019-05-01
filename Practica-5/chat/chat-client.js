function main() {
  console.log("Hola!!!!-------------")
  var person = prompt("Please enter your name");

  //-- Crear el websocket
  //var socket = io();
  const io = require('socket.io-client');
  const socket = io('http://localhost:3000');

  //-- Obtener los elementos de interfaz:

  //-- Boton de envio de mensaje
  var send = document.getElementById('send')

  //-- Parrafo para mostrar mensajes recibidos
  var display = document.getElementById('display')

  //-- Caja con el mensaje a enviar
  var msg = document.getElementById("msg")

  var usuarios = document.getElementById('user')

  //cuando se aprieta el enter envia el menasaje
  // Execute a function when the user releases a key on the keyboard
  msg.addEventListener("keypress", function(event) {
  // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("send").click();
    }
  });

  socket.emit('persona', person)

  //-- Cuando se aprieta el botón de enviar...
  send.onclick = () => {

    //-- Enviar el mensaje, con el evento "new_message"
    socket.emit('new_message',person + ": " + msg.value);

    //-- Lo notificamos en la consola del navegador
    console.log("Mensaje emitido")
    console.log(msg.value);//el mensaje en si
    msg.value = ""
  }

  //-- Cuando se reciba un mensaje del servidor se muestra
  //-- en el párrafo
  socket.on('usuarios', usuar => {
    usuarios.innerHTML = usuar
    console.log(usuar)
  });

  socket.on('bienvenido', wel => {
    display.innerHTML += wel + '<br>'
  });
  socket.on('Abandono', aban => {
    display.innerHTML += aban + '<br>'
  });

  socket.on('new_message', msg => {
    display.innerHTML += msg + '<br>'
  });
}
