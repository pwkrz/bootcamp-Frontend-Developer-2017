import * as express from "express";
import {Customer} from "../model/customer";
import {Customers as CustomerList} from "../model/customers";
import {Products as ProductsInStore} from "../model/products";

export class Customers {
	
    private customerList: CustomerList;
    // private customerList: Array<Customer> = []
    
    public static routes(): express.Router {
        let router: express.Router = express.Router()
        let customersRoute: Customers = new Customers();

        router.get("/customers", customersRoute.index.bind(customersRoute));
        router.post("/customers", customersRoute.create.bind(customersRoute));
        router.put("/customers/:id", customersRoute.update.bind(customersRoute));
        router.delete("/customers/:id", customersRoute.delete.bind(customersRoute));
        router.get("/customers/:customer", customersRoute.find.bind(customersRoute));
        router.post("/customers/delete/:id", customersRoute.delete.bind(customersRoute));
        router.post("/customers/update/:id", customersRoute.update.bind(customersRoute));
        router.get("/customers/:id/get-products", customersRoute.getAllProducts.bind(customersRoute));
        router.post("/customers/:id/get-products", customersRoute.getProduct.bind(customersRoute));
        router.post("/customers/:id/add-product", customersRoute.addProduct.bind(customersRoute));

        return router
    }

    constructor(){
		this.customerList = new CustomerList([
			new Customer(1, "Werner Smith", "werner@trinity.com"),
		]);
    }

    public index(req: express.Request, res: express.Response) {
        res.json(this.customerList.getList());
    }
	
	public create(req: express.Request, res: express.Response) {
        let customerName: string = req.body.name;
        let email: string = req.body.email || "";
		
		console.log(req.body.name)
		
		if(!customerName){
			res.status(500).send("Podaj imię!")
			return
		}
				
		res.json(this.customerList.add(customerName, email));
    }
	
	public update(req: express.Request, res: express.Response) {
		let customerId: number = parseInt( req.params.id );
		let customer: Customer = this.customerList.fetch(customerId)
		
		let customerName: string = req.body.name;
		let email: string = req.body.email;
	
		if(!customer){
			res.status(404).send("Not found!")
			return
		}
		
		if(customerName !== undefined){
			customer.setName(customerName)
		}
		
		if(email){
			customer.setEmail(email)
		}
		
		res.json(customer)
	}
	
	public find(req: express.Request, res: express.Response) {
        let customerQuery: string = req.params.customer;
		
		let customerArr: Array<Customer> = this.customerList.find(customerQuery);
		
		if(!customerArr.length){
			res.status(404).send("Not found!")
			return
		}
		
		res.json(customerArr)
    }
	
	public delete(req: express.Request, res: express.Response) {
		let customerId: number = parseInt( req.params.id );
		
		let isDeleted: Boolean = this.customerList.delete(customerId)
		
		if(!isDeleted){
			res.status(404).send("Not found!")
			return
		} else {
			res.json({ success: true })
		}
	}

	public getAllProducts(req: express.Request, res: express.Response) {

		let customerId: number = parseInt( req.params.id );
		let customer: Customer = this.customerList.fetch(customerId);

		if(!customer){
			res.status(404).send("Not found!")
			return
		}
		
		res.json(customer.getAllProducts())
	}
	
	public getProduct(req: express.Request, res: express.Response) {

		let customerId: number = parseInt( req.params.id );
		let customer: Customer = this.customerList.fetch(customerId);

		let query: string = req.body.query;

		if(!customer || !query){
			res.status(404).send("Not found!")
			return
		}
		
		res.json(customer.getProduct(query))
	}

	public addProduct(req: express.Request, res: express.Response) {

		let customerId: number = parseInt( req.params.id );
		let customer: Customer = this.customerList.fetch(customerId)
		
		let product: string = req.body.product;
		let quantity: number = parseInt(req.body.quantity);

		if(!customer){
			res.status(404).send("Not found!")
			return
		}
		// console.log(ProductsInStore)
		// if(product in ProductsInStore){

		if( customer.getProduct(product).length ){
			customer.updateProdQuantity(product, quantity)
		} else {
			customer.addProducts(product, quantity)
		}

			
		// }
		
		res.json({customer: customer.getName(), products: customer.getAllProducts()})

	}

}