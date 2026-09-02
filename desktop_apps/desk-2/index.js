const {app, BrowserWindow} = require('electron');

function createWindow() {
    const window = new BrowserWindow({
        width : 400,
        height : 400
    })

    //window.webContents.openDevTools();

    window.loadFile('index.html');
}


app.whenReady().then(createWindow)