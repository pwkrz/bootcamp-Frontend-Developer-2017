var ws = require("nodejs-websocket")
 
var server = ws.createServer(function (conn) {
    conn.on("text", function (dane) {
        conn.nick = JSON.parse(dane).nick
		broadcast(dane);
        console.log(conn.nick + " dołączył/a do czata!");
    });
	
    conn.on("close", function (dane) {
        console.log(conn.nick + " opuścił/a czat.")
		broadcast(JSON.stringify({
			type: "status",
			message: conn.nick + " opuścił/a czat."
		}))
    });
	
}).listen(8001, "localhost", function(){
	
	console.log("Serwer nasłuchuje na porcie :8001")
	
})

function broadcast(dane) {

    server.connections.forEach(function (conn) {
        conn.sendText(dane)
    })
}