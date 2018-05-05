import * as express from "express";
import * as path from 'path';

export class Index {

    public static serveFile (htmlPath: string) {

        return function (req: express.Request, res: express.Response, next: any) {
            if(req.path === "/" && req.method === "GET") {
    
                res.sendFile(htmlPath)
                
            } else {
                let error = (new Error() as any);
                error.status = req.path !== "/" ? 404 : 405;
                next(error)
            }
        }

    }
}