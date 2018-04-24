var http = require("http");
var finalhandler = require("finalhandler");
var serveStatic = require("serve-static");
var WebSocketServer = require("websocket").server;
var networkInterfaces = require("os").networkInterfaces;
var getTimeStamp = require("./lib/helpers").getTimeStamp;
var sanitizeString = require("./lib/helpers").sanitizeString;
var ipV4check = /\b(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\b/;
var port = 3000;
var userNicks = [];
var allowedOrigins = ["http://localhost:" + port];

var serve = serveStatic("dist", {"acceptRanges": false})
 
var httpServer = http.createServer(function(req, res) {

    serve(req, res, finalhandler(req, res));
});
 
httpServer.listen(port, function() {

    var networkInfo = networkInterfaces();

    console.log("\nChat available at:\n")

    for(var prop in networkInfo){

        if( ipV4check.test( networkInfo[prop][1].address ) ){

            var fullURL = "http://" + networkInfo[prop][1].address + ":" + port;

            allowedOrigins.push(fullURL);

            console.log(fullURL + " (" + prop + ")")
        }
    }
});

var wsServer = new WebSocketServer({
    httpServer,
    closeTimeout: 5000
});
 
function originIsAllowed(origin) {

  return allowedOrigins.includes(origin);
}
 
wsServer.on("request", function(request) {

    if (!originIsAllowed(request.origin)) {
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