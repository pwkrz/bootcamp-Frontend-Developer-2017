const fs = require("fs");
const path = require("path");
const mimeTypes = require("./helpers").mimeTypes;

module.exports = function(response, pathName, port) {

    let fileName = path.resolve( path.join(__dirname, "..", "dist", pathName) );

    if ( fs.existsSync(fileName) && fs.statSync(fileName).isDirectory() ) {

        fileName = path.join(fileName, "index.html");

    }

    if( !(fs.existsSync(fileName)) ) {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not Found\n");
        response.end();
        return;
    }
    
    let mimeType = mimeTypes[ fileName.split(".").pop() ];

    fs.readFile(fileName, "utf8", function(err,data) {

        if (err) {
            console.log(err);
            return;
        }

        if (mimeType === "text/javascript") {
            data = data.replace("@wsPort@", port);
        }

        response.writeHead(200, { "Content-type": mimeType });
        response.write(data);
        response.end();

    });
}