import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as IndexRoute from './routes/index';
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
        
        router.use(IndexRoute.Index.routes())
        router.use(ProductsRoute.Products.routes())
        router.use(CustomerRoutes.routes())

        this.app.use(router);
    };

    startServer() {
        this.app.listen(3000, function () {
            console.log("Server listening on port 3000");
        });
    }
}
