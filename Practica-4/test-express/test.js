var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientes = 0;

//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log("Página principal2: /")
});

//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log("Fichero js solicituado")
});

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});

//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  console.log('--> Usuario conectado!');
  clientes = clientes + 1;
  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');
      clientes = clientes - 1;
  });

  //-- Detectar si se ha recibido un mensaje del cliente
   socket.on('new_message', msg => {
   //-- Notificarlo en la consola del servidor
   console.log("Mensaje recibido: " + msg)

   //-- Emitir un mensaje a todos los clientes conectados

     //switch (msg){
       //case "/help":
       //msg = '<br>' + '/help:' + '<br>'+ 'Mostrará una lista con todos los comandos soportados'
            // +'<br>' + '/list:' + '<br>'+ 'Devolverá el número de usuarios conectados'
          //   +'<br>' + '/hello:' + '<br>'+ 'El servidor nos devolverá el saludo'
        //     +'<br>' + '/date:' + '<br>'+ 'Nos devolverá la fecha'
       //socket.emit('new_message', msg);
       //default:
         //console.log("entro33333");
         //io.emit('new_message', msg);
     //}
     //console.log(msg);
     if (msg === '/help') {
       console.log("funciona");
         msg = '<br>' + '/help:' + '<br>'+ 'Mostrará una lista con todos los comandos soportados'
               +'<br>' + '/list:' + '<br>'+ 'Devolverá el número de usuarios conectados'
               +'<br>' + '/hello:' + '<br>'+ 'El servidor nos devolverá el saludo'
               +'<br>' + '/date:' + '<br>'+ 'Nos devolverá la fecha'
         socket.emit('new_message', msg);
     }else if (msg === '/list') {
       console.log(clientes + "numero de clientes%%%");
        msg = 'Usuarios conectados: ' + clientes
        socket.emit('new_message', msg);
     }else{
       console.log("entro33333");
       io.emit('new_message', msg);
     }
 });

});
