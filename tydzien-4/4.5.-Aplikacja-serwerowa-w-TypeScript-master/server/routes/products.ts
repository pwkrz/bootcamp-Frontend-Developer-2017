import * as express from "express";
import * as Product from "../model/product";
import * as ProductsModel from "../model/products";

export class Products {
	
    private productList: ProductsModel.Products;
    // private productList: Array<Product.Product> = []
    
    public static routes(): express.Router {
        let router: express.Router = express.Router()
        let productsRoute: Products = new Products();

        router.get("/products", productsRoute.index.bind(productsRoute));
        router.post("/products", productsRoute.create.bind(productsRoute));
        router.put("/products/:product_id", productsRoute.update.bind(productsRoute));
        router.delete("/products/:product_id", productsRoute.delete.bind(productsRoute));
        router.get("/products/:product", productsRoute.find.bind(productsRoute));
        router.post("/products/delete/:product_id", productsRoute.delete.bind(productsRoute));
        router.post("/products/update/:product_id", productsRoute.update.bind(productsRoute));

        return router
    }

    constructor(){
		this.productList = new ProductsModel.Products([
			new Product.Product(1, "First product", 1),
			new Product.Product(2, "Second product", 21),
			new Product.Product(3, "Third product")
		]);
    }

    public index(req: express.Request, res: express.Response) {
        res.json(this.productList.getList());
    }
	
	public create(req: express.Request, res: express.Response) {
        let productName: string = req.body.name;
        let quantity: number = parseInt(req.body.quantity) || 0;
		
		if(!productName){
			res.status(500).send("Product name not found!")
			return
		}
				
		res.json(this.productList.add(productName, quantity));
    }
	
	public update(req: express.Request, res: express.Response) {
		let productId: number = parseInt( req.params.product_id );
		let product: Product.Product = this.productList.fetch(productId)
		
		let productName: string = req.body.name;
		let quantity: number = parseInt(req.body.quantity)
	
		if(!product){
			res.status(404).send("Not found!")
			return
		}

		if(productName !== undefined){
			product.setName(productName)
		}
		
		if(quantity){
			product.updateQuantity(quantity)
		}
		
		res.json(product)
	}
	
	public find(req: express.Request, res: express.Response) {
        let productQuery: string = req.params.product;
		
		let product: Array<Product.Product> = this.productList.find(productQuery)
		
		if(!product.length){
			res.status(404).send("Not found!");
			return;
		}
		
		res.json(product)
    }
	
	public delete(req: express.Request, res: express.Response) {
		let productId: string = req.params.product_id;
		
		let isDeleted: Boolean = this.productList.delete(productId)
		
		if(!isDeleted){
			res.status(404).send("Not found!")
			return
		} else {
			res.json({ success: true })
		}
	}
}