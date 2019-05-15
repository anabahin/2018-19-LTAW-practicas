const electron = require('electron');
const io = require('socket.io-client');
var ipcMain = electron.ipcMain;
const socket = io('http://localhost:4000');

//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
electron.app.on('ready', ()=>{
  console.log("Evento Ready!")

  // Crear la ventana principal de nuestra Interfaz Gráfica
  win = new electron.BrowserWindow({
    width: 600,
    height: 400
  })

  //-- En la parte superior se nos ha creado el menu
  //-- por defecto
  //-- Si lo queremos quitar, hay que añadir esta línea
  //win.setMenuBarVisibility(false)

  //-- Cargar la interfaz gráfica, que se encuentra en el
  //-- fichero index.html
  win.loadFile('index.html')

  win.on('closed', () => {
		// por último escuchamos el evento `closed` de la ventana para limpar la variable `window`
		// de esta forma permitimos matar la ventana sin matar al aplicación
		win = null
	});


  win.webContents.once('dom-ready', () =>   {

  const socket = io('http://localhost:4500');

  socket.on('server_message', msg =>{                      //on server message
  //ipcMain.send('new_message', msg);
    console.log(msg)
    win.webContents.send('server_message', msg);

  });

  socket.on('bienvenido', well =>{                      //on server message
    //ipcMain.send('Welcome', msg);
    console.log(msg)
    win.webContents.send('bienvenido', well);
  });

  socket.on('new_message', msg => {
  //when a new message is received, print it in display element
  //ipcMain.send('new_message', msg);
    win.webContents.send('new_message', msg);
  });

    ipcMain.on('enviarmensaje', (event,payload) =>{
    socket.emit('enviarmensaje', payload);
  });
  })
})
