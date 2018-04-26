// class Products extends baseList

import * as Product from "./product";

export class Products {
	private productsList: Array<Product.Product>;
	
	constructor(products: Array<Product.Product> = []){
		this.productsList = new Array<Product.Product>();
		
		products.forEach( product => this.productsList.push(product) )
	}
	
	public list(): Array<Product.Product> {
		return this.productsList
	}

	public getMaxId() {
        let productIds : Array<number> = this.productsList.map(
            (product) => product.getId()
		);

        return Math.max(...productIds, 0);
    }
	
	public add(productName: string, quantity: number): Array<Product.Product> {

		let productId: number = this.getMaxId() + 1;

		// console.log(productId)
		
		let product = new Product.Product(productId, productName, quantity)
		
		this.productsList.push(product);
		
		return this.productsList;
	}

	public modifyQuantity(productName: string, quantity: number) {
		
		for(let product of this.productsList){
			
			if( product.getName() === productName ){
                product.updateQuantity( quantity )
                
                if( product.getQuantity() < 1 ) { this.delete(productName) }
            }
        }
	}
	
	public fetch(productId: number): Product.Product {
		return productId && this.productsList.filter( 
			(val: Product.Product) => val.getId() === productId
		).shift();
	}
	
	public find(product: string): Product.Product {
		return product && this.productsList.filter( 
			(val: Product.Product) => ( val.getId() === parseInt(product)
				|| val.getName().toLowerCase() === product.toLowerCase() )
		).shift();
	}
	
	public delete(product: string): Boolean {
		let deleted = false;
		
		this.productsList = this.productsList.filter( function(val: Product.Product){
			deleted = ( val.getId() === parseInt(product) || val.getName().toLowerCase() === product.toLowerCase() )
			return ( val.getId() !== parseInt(product) && val.getName().toLowerCase() !== product.toLowerCase() )
		} );
		
		return deleted;
	}
	
	
	
}