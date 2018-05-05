import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as ErrorHandler from './routes/404';
import * as ProductsRoute from './routes/products';
import {Customers as CustomerRoutes} from './routes/customers';

export class Server {

    private app: express.Application;

    public static bootstrap(): Server {
        return new Server()
    }
    
    constructor() {
        this.app = express();
		
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({
			extended: true
		}))

        this.setRoutes()
    };

    private setRoutes() {
        let router: express.Router = express.Router();
        
        router.use(ProductsRoute.Products.routes());
        router.use(CustomerRoutes.routes());

        this.app.use(router);
        this.app.use(express.static(path.join(__dirname, 'public'), {"fallthrough": false}));
        this.app.use(ErrorHandler.ErrorHandler.handle)
    };

    startServer() {
        this.app.listen(3000, function () {
            console.log("\nServer listening on port 3000\n");
        });
    }
}
