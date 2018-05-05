import * as express from "express";

export class ErrorHandler {

    public static handle(err: any, req: express.Request, res: express.Response, next: any) {
        res.status(err.status || 404)
           .send("<pre>Error " + err.status + ": Resource not available.</pre>");
    }

}