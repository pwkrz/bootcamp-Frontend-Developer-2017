import {BaseList} from "./baseModels/list";
import {Product} from "./product";

export class Products extends BaseList {
	
	constructor(products: Array<Product> = []){
		super(products)
	}
	
	public add(productName: string, quantity: number): Array<Product> {

		let productId: number = this.getMaxId() + 1;

		this.list.push( new Product(productId, productName, quantity) );

		return this.list;
	}

	public modifyQuantity(productName: string, quantity: number) {
		
		for(let product of this.list){
			
			if( product.getName() === productName ){
                product.updateQuantity( quantity )
                
                if( product.getQuantity() < 1 ) { this.delete(productName) }
            }
        }
	}	
}