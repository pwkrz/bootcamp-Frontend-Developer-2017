const WebSocketServer = require("websocket").server;
const getTimeStamp = require("./../lib/helpers").getTimeStamp;

module.exports = function(httpServer, closeTimeout, allowedOrigins) {

    let wsServer = new WebSocketServer({ httpServer, closeTimeout }),
        userNicks = [];

    return wsServer.on("request", function(request) {
    
        if ( !(allowedOrigins.includes(request.origin)) ) {

          request.reject();
          console.log("\n" + (getTimeStamp()) + " Connection from origin [" + request.origin + "] rejected.");
          return;
        }
        
        var connection = request.accept("magic-ws-protocol", request.origin);
    
        console.log("\n" + (getTimeStamp()) + " Connection from origin [" + request.origin + "] accepted.");
    
        connection.on("message", function(message) {
    
            var dataObj = JSON.parse(message.utf8Data);
    
            if( dataObj.type === "validation" && dataObj.nick ){
    
                if( userNicks.includes(dataObj.nick) ){
    
                    connection.sendUTF(JSON.stringify({
                        type: "nickError",
                        message: "This nickname is already in use."
                    }));
    
                    connection.close(4001, "Nickname already in use.")
    
                    return;
    
                } else {

                    connection.nick = dataObj.nick;
    
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
};