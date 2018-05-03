const httpInit = require("./servers/http-server");
const wsInit = require("./servers/ws-server");

const port = process.argv[2] || 3000;

const { httpServer, allowedOrigins } = httpInit(port);
const websocketServer = wsInit(httpServer, allowedOrigins);