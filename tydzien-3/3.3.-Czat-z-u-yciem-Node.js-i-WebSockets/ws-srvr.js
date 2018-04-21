var ws = require("nodejs-websocket")
 
var server = ws.createServer(function (conn) {
    conn.on("text", function (data) {
        conn.nick = JSON.parse(data).nick
		broadcast(data);
        console.log(conn.nick + " joined the chat!");
    });
	
    conn.on("close", function (data) {
        console.log(conn.nick + " left the chat.")
		broadcast(JSON.stringify({
			type: "status",
			message: conn.nick + " left the chat."
		}))
    });
	
}).listen(8001, "localhost", function(){
	
	console.log("Server listening on port: 8001")
	
})

function broadcast(data) {

    server.connections.forEach(function (conn) {
        conn.sendText(data)
    })
}