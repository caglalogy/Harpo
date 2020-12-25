const electron = require("electron");
const url = require("url");
const path = require("path");


const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;



app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 685,
        webPreferences: {
        nodeIntegration: true
      }
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "main.html"),
            protocol: "file:",
            slashes: true
        })
    );

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
    //aaaaaaaaaaaaaaaaaa
        var inputMessage
        var keycode
    ipcMain.on ("key:inputValue", (err, data) =>{
        inputMessage = data
        console.log("Message : " +inputMessage)
    });

    ipcMain.on("key:keyValue", (err, data) =>{
        keycode = data
        console.log("Key : "+ keycode)
    });

    ipcMain.on("key:sendBtn", (err, data) =>{
        console.log("OK " + inputMessage + " " + keycode);
        var inputMessage2 = inputMessage * 2
        mainWindow.webContents.send("key:data", inputMessage2)
    })

        var resultMessage
    ipcMain.on("key:resultValue", (err, data) =>{
        resultMessage = data
        console.log("Result : " + resultMessage)
    })
//aaaaaa

});

const mainMenuTemplate = [
    {
        label : "Exit",
        submenu : [
            {
                label : "Quit",
                accelerator : process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
                role : "quit"
            }
        ]
    },
    {
        label : "Reload",
        role : "reload"
    }
];

if(process.platform == "darwin"){
    mainMenuTemplate.unshift({
        label : app.getName(),
        role : "TODO"
    })
}

if(process.env.NODE_ENV !== "production"){
    mainMenuTemplate.push(
        {
            label : "Dev Tools",
            submenu : [
                {
                    label : "DevTool",
                    accelerator : process.platform == "darwin" ? "Command+T" : "Ctrl+T",
                    click(item, focusedWindow){
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    label : "Yenile",
                    role : "reload"
                }
            ]
        }
    )
}