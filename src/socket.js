"use strict";

const WebSocket = require("ws");

const handleProtocols = (protocols /*, request */ ) => {
    console.info(`Incoming protocol requests '${protocols}'.`);
    for (let i = 0; i < protocols.length; i++) {
        return 'json';
    }
    return false;
};

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

let socket = (server) => {
    const wss = makeWss(server);

    wss.on("connection", (ws /*, req*/ ) => {
        console.info("Connection received. Adding client.");

        ws.on("message", (message) => {
            console.log(message);
            broadcastExcept(wss, ws, message);
        });

        ws.on("error", (error) => {
            console.error(`Server error: ${error}`);
        });

        ws.on("close", (code, reason) => {
            console.info(`Closing connection: ${code} ${reason}`);
        });
    });
}

module.exports = {
    socket: socket
};
