var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var clientes = 0;
var nombres = [];
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
  console.log("ha entrado en el welcome");
  socket.on('persona', person => {
    console.log(person);
    nombres += person + ',' + '\n';
    console.log( "todos los usuarios: " + nombres );
    socket.emit('bienvenido',"bienvenido al chat " + person );
    socket.broadcast.emit('bienvenido', "El nuevo usuario llamado " + person + " se ha unido al chat")

  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');
      clientes = clientes - 1;
      socket.broadcast.emit('Abandono', "El  usuario  " + person + "  ha abandonado el chat")
      console.log(person);

  });
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
     var msg_new = msg.split(":")[1];
     console.log("recibo el mendaje cortado:  " + msg_new);
     if (msg_new === ' /help') {
       console.log("funciona");
         msg = '<br>' + '/help:' + '<br>'+ 'Mostrará una lista con todos los comandos soportados'
               +'<br>' + '/list:' + '<br>'+ 'Devolverá el número de usuarios conectados'
               +'<br>' + '/hello:' + '<br>'+ 'El servidor nos devolverá el saludo'
               +'<br>' + '/date:' + '<br>'+ 'Nos devolverá la fecha'
         socket.emit('new_message', msg);

     }else if (msg_new === ' /list') {
       console.log(clientes + "numero de clientes%%%");
        msg = 'Usuarios conectados: ' + clientes + '<br>' +  nombres
        socket.emit('new_message', msg);

     } else if (msg_new === ' /hello') {
        msg = '<br>' + 'Buenas soy el servidor...'
        socket.emit('new_message', msg)
     } else if (msg_new === ' /date') {
       console.log("entro en date");
        var fecha= new Date();
        msg = 'Fecha: ' + fecha.getDate()
              + '<br> Dia de la semana: ' + fecha.getDay()
              + '<br> Mes (0 al 11): ' + fecha.getMonth()
              + '<br> Año: ' + fecha.getFullYear()
              + '<br> Hora: ' + fecha.getHours()
            //  + '<br> Hora UTC: ' + fecha.getUTCHours()
              + '<br> Minutos: ' + fecha.getMinutes()
              + '<br> Segundos: ' + fecha.getSeconds();
        socket.emit('new_message', msg);
     } else{
       console.log("entro33333");
       io.emit('new_message', msg);
     }
 });

});
