var ws = require("nodejs-websocket");
var errorLookup = require("./assets/helpers").errorLookup;
var getTimeStamp = require("./assets/helpers").getTimeStamp;

 
var server = ws.createServer(function (conn) {

    conn.on("text", function (data) {
        
        var dataObj = JSON.parse(data);

        if(dataObj.type === "status" && dataObj.nick){
            var timeStamp = getTimeStamp();

            conn.nick = dataObj.nick;

            console.log(timeStamp + ": " + dataObj.message + "\n");
        }

		broadcast(data);
    });
    
    // Logically Error and Close handlers should switch places, but for some reason only this works

    conn.on("error", function (data) {

        var timeStamp = getTimeStamp();

        console.log(timeStamp + ": " + conn.nick + " left the chat.\n");
        
		broadcast(JSON.stringify({
			type: "status",
			message: conn.nick + " left the chat."
		}))
    });

    conn.on("close", function (err) {

        var timeStamp = getTimeStamp();
        
        console.error(timeStamp + ": " + "Error " + err + ": " + errorLookup[err][0] + "\n");

        console.info(errorLookup[err][1] + "\n");
    });
})

server.listen(8001, function(){

    console.log("Server listening on port 8001\n");
	
})

function broadcast(data) {

    server.connections.forEach(function (conn) {
        conn.sendText(data)
    })
}