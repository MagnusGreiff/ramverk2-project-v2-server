"use strict";

const WebSocket = require("ws");

const handleProtocols = (protocols /*, request */ ) => {
    console.info(`Incoming protocol requests '${protocols}'.`);
    for (let i = 0; i < protocols.length; i++) {
        return 'json';
    }
    return false;
};

let users = [];

let makeWss = (server) => {
    return new WebSocket.Server({
        server: server,
        clientTracking: true, // keep track on connected clients
        handleProtocols: handleProtocols
    });
};

let broadcastExcept = (wss, ws, data) => {
    let clients = 0;

    wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            clients++;

            let msg = {
                data: data
            };

            client.send(JSON.stringify(msg));
        }
    });
    console.info(`Broadcasted data to ${clients} (${wss.clients.size}) clients.`);
};

let broadCastAll = (wss, ws, data) => {
    let clients = 0;

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            clients++;

            let msg = {
                data: data
            };

            client.send(JSON.stringify(msg));
        }
    });
    console.info(`Broadcasted data to ${clients} (${wss.clients.size}) clients.`);
}

let socket = (server) => {
    const wss = makeWss(server);

    wss.on("connection", (ws /*, req*/ ) => {
        console.info("Connection received. Adding client.");

        ws.on("message", (message) => {
            let parsedJson = JSON.parse(message);

            if (parsedJson.type == "newUser") {
                users.push(parsedJson.name);
                let userList = {
                    type: 'userList',
                    userList: users
                };
                broadCastAll(wss, ws, userList);
            } else if (parsedJson.type == "disconnectedUser") {
                console.log('inside disconnect');
                console.log(parsedJson);
                let name = users.indexOf(parsedJson.name);
                if(name != -1) {
                	users.splice(name, 1);
                }
                let userList = {
                    type: 'userList',
                    userList: users
                };
                broadCastAll(wss, ws, userList);
            } else {
                broadcastExcept(wss, ws, message);
            }
        });

        ws.on("error", (error) => {
            console.error(`Server error: ${error}`);
        });

        ws.on("close", (code, reason) => {
            console.log(reason);
            console.info(`Closing connection: ${code} ${reason}`);
        });
    });
}

module.exports = {
    socket: socket
};
