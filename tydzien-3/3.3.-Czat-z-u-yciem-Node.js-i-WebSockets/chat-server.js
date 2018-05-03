const httpInit = require("./servers/http-server");
const wsInit = require("./servers/ws-server");

const port = 3000;
const socketTimeout = 5000;

const { httpServer, allowedOrigins } = httpInit(port);
const websocketServer = wsInit(httpServer, socketTimeout, allowedOrigins);