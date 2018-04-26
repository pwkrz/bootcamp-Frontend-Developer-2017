"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
    }
    ;
    Server.prototype.setRoutes = function () {
        this.app.get("/", this.renderIndex);
    };
    ;
    Server.prototype.startServer = function () {
        this.app.listen(3000, function () {
            console.log("Serwer nasłuchuje na porcie 3000");
        });
    };
    Server.prototype.renderIndex = function (req, res) {
        res.send("Działa!");
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map