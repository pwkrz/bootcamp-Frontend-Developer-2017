const fs = require("fs");
const path = require("path");
const mimeTypes = require("./helpers").mimeTypes;

module.exports = function(response, pathName) {

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

        response.writeHead(200, { "Content-type": mimeType });
        response.write(data);
        response.end();

    });
}