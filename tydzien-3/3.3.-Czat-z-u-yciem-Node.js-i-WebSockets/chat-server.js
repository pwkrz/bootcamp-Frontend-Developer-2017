var http = require("http");
var finalhandler = require("finalhandler");
var serveStatic = require("serve-static");
var WebSocketServer = require("websocket").server;
var networkInterfaces = require("os").networkInterfaces;
var getTimeStamp = require("./lib/helpers").getTimeStamp;
var ipV4check = /\b(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\b/;
var httpPort = 3000;

var serve = serveStatic("dist", {"acceptRanges": false})
 
var httpServer = http.createServer(function(req, res) {

    serve(req, res, finalhandler(req, res));
});
 
httpServer.listen(httpPort, function() {

    var networkInfo = networkInterfaces();

    console.log("\nChat available at:\n")

    for(var prop in networkInfo){

        if( ipV4check.test( networkInfo[prop][1].address ) ){

            var addressInfo = "http://" + networkInfo[prop][1].address + ":" + httpPort + " (" + prop + ")";

            console.log(addressInfo)
        }
    }
});

var wsServer = new WebSocketServer({
    httpServer: httpServer,
    closeTimeout: 5000
});
 
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
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

        if(dataObj.type === "status" && dataObj.nick){

            connection.nick = dataObj.nick;

            console.log("\n" + (getTimeStamp()) + " Peer " + connection.remoteAddress + " joined chat.");
        }

		wsServer.broadcastUTF(message.utf8Data);
    });

    connection.on("close", function(reasonCode, description) {

        console.log((getTimeStamp()) + " Peer " + connection.remoteAddress + " left chat.");
        console.log("Code: " + reasonCode);
        console.log(description);

        wsServer.broadcastUTF(JSON.stringify({
			type: "status",
			message: connection.nick + " left the chat."
		}))
    });
});