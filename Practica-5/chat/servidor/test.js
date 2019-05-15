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
http.listen(5000, function(){
  console.log('listening on *:3000');
});

//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  console.log('--> Usuario conectado!');
  clientes = clientes + 1;
  console.log("ha entrado en el welcome");
  //socket.on('persona', person => {
    //console.log(person);
    //nombres += person + ',' + '\n';
    //io.emit('usuarios', nombres)
    //console.log( "todos los usuarios: " + nombres );
    socket.emit('bienvenido',"bienvenido al chat ");
    socket.broadcast.emit('bienvenido', "El nuevo usuario llamado  se ha unido al chat")

  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');
      clientes = clientes - 1;
      //nombres -= person + ',' + '\n';
      socket.broadcast.emit('Abandono', "El  usuario ha abandonado el chat")
      //console.log(person);

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
     var msg_new = msg;
     console.log("recibo el mendaje cortado:" + msg_new);
     if (msg_new === '/help') {
       console.log("funciona");
         msg =  '/help: Mostrará una lista con todos los comandos soportados'
               +'\n' + '/list: Devolverá el número de usuarios conectados'
               +'\n' + '/hello: El servidor nos devolverá el saludo'
               +'\n' + '/date: Nos devolverá la fecha'
         socket.emit('new_message', msg);

     }else if (msg_new === '/list') {
       console.log(clientes + "numero de clientes%%%");
        msg = 'Usuarios conectados: ' + clientes + '\n'
        socket.emit('new_message', msg);

     } else if (msg_new === '/hello') {
        msg = 'Buenas soy el servidor...'
        socket.emit('new_message', msg)
     } else if (msg_new === '/date') {
       console.log("entro en date");
        var fecha= new Date();
        msg = 'Fecha: ' + fecha.getDate()
              + '\n Dia de la semana: ' + fecha.getDay()
              + '\n Mes : ' + (fecha.getMonth() + 1)
              + '\n Año: ' + fecha.getFullYear()
              + '\n Hora: ' + fecha.getHours()
            //  + '<br> Hora UTC: ' + fecha.getUTCHours()
              + '\n Minutos: ' + fecha.getMinutes()
              + '\n Segundos: ' + fecha.getSeconds();
        socket.emit('new_message', msg);
     } else{
       console.log("entro33333");
       io.emit('new_message', msg);
     }
 });

});
