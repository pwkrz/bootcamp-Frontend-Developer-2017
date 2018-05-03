const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const WebSocketServer = require("websocket").server;

const networkInterfaces = require("os").networkInterfaces;
const getTimeStamp = require("./lib/helpers").getTimeStamp;
const render = require("./lib/render.js");
const ipV4check = require("./lib/helpers").ipV4check;

const port = 3000;
const userNicks = [];

const httpInit = require("./servers/http-server");

const { httpServer, allowedOrigins } = httpInit(port);

var wsServer = new WebSocketServer({
    httpServer,
    closeTimeout: 5000
});
 
wsServer.on("request", function(request) {

    if ( !(allowedOrigins.includes(request.origin)) ) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log("\n" + (getTimeStamp()) + " Connection from origin [" + request.origin + "] rejected.");
      return;
    }
    
    var connection = request.accept("magic-ws-protocol", request.origin);

    console.log("\n" + (getTimeStamp()) + " Connection from origin [" + request.origin + "] accepted.");

    connection.on("message", function(message) {

        var dataObj = JSON.parse(message.utf8Data);

        if( dataObj.type === "validation" && dataObj.nick ){

            connection.nick = dataObj.nick;

            if( userNicks.includes(connection.nick) ){

                connection.sendUTF(JSON.stringify({
                    type: "nickError",
                    message: "This nickname is already in use."
                }));

                connection.close(4001, "Nickname already in use.")

                return;

            } else {

                userNicks.push(connection.nick);

                wsServer.broadcastUTF(JSON.stringify({
                    type: "accepted",
                    nick: connection.nick,
                    message: "joined the chat!"
                }));

                console.log("\n" + (getTimeStamp()) + " Peer " + connection.remoteAddress + " joined chat.");
            }        
        } else {

            if (dataObj.message) {

                dataObj.message = dataObj.message;

            }

            wsServer.broadcastUTF(JSON.stringify(dataObj));
        }
    });

    connection.on("close", function(reasonCode, description) {

        console.log((getTimeStamp()) + " Peer " + connection.remoteAddress + " left chat.");
        console.log("Code: " + reasonCode);
        console.log(description);

        if(connection.nick){

            userNicks = userNicks.filter(function(nick){
                return nick !== connection.nick;
            })
    
            wsServer.broadcastUTF(JSON.stringify({
                type: "status",
                nick: connection.nick,
                message: "left the chat."
            }))
        }
    });
});