// const {app, BrowserWindow} = require('electron');

import {app, BrowserWindow} from "electron";

function createWindow() {
    const window = new BrowserWindow({
        width : 400,
        height : 400
    })

    //window.webContents.openDevTools();

    window.loadURL('http://localhost:5173/');
}


app.whenReady().then(createWindow)