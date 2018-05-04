const http = require("http");
const url = require("url");
const networkInterfaces = require("os").networkInterfaces;

const render = require("./../lib/render.js");
const ipV4check = require("./../lib/helpers").ipV4check;

module.exports = function(port) {

    let allowedOrigins = ["http://localhost:" + port];

    return {

        // http server initializer
        httpServer: http.createServer(function(req, res) {

        if (req.method !== "GET") {

            console.log("\nUnsupported request method: " + req.method);

            res.writeHead(405, { "Content-type": "text/plain" });
            res.write("Only GET requests allowed");
            res.end();
            return;
        }

            let pathName = url.parse(req.url).pathname;
        
            render(res, pathName, port);
        
        }).listen(port, function() {
        
            var networkInfo = networkInterfaces();
        
            console.log("\nChat available at:\n")
        
            for(var prop in networkInfo){
        
                if( ipV4check.test( networkInfo[prop][1].address ) ){
        
                    var fullURL = "http://" + networkInfo[prop][1].address + ":" + port;
        
                    allowedOrigins.push(fullURL);
        
                    console.log(fullURL + " (" + prop + ")")
                }
            }
        }),
        
        // complete list of allowed origins after server is initialized
        allowedOrigins: allowedOrigins
    }
};