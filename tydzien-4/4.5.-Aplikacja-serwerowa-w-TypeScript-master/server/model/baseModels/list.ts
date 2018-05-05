import {BaseItem} from "./item";
import {Customer} from "../customer";
import {Product} from "../product";

export class BaseList {

    protected list: Array<any>;

    constructor(items: Array<Customer|Product>){

        if ( items.every( el => el instanceof Customer ) ) {

            this.list = new Array<Customer>();

        } else if ( items.every( el => el instanceof Product ) ) {

            this.list = new Array<Product>();

        }
   
        items.forEach( item => this.list.push(item) )
    }

    public getList(): Array<Customer|Product> {
		return this.list;
    }


	public getMaxId() {
        let indexes : Array<number> = this.list.map(
            (el: Customer | Product) => el.getId()
        );

        return Math.max(...indexes, 0);
    }
    // To do?
    // public add(productName: string, quantity: number): Array<Product.Product> {

	// 	let productId: number = this.getMaxId() + 1;
		
	// 	let product = new Product.Product(productId, productName, quantity)
		
	// 	this.productsList.push(product);
		
	// 	return this.productsList;
	// }
    
    public fetch(id: number) {
        
        return this.find(id).shift();
	}
	
	public find(itemQuery: string|number) {

        let matches = this.list.filter( 
			(el: Customer | Product) => ( el.getId() === parseInt(itemQuery.toString())
                || el.getName().toLowerCase().indexOf( itemQuery.toString().toLowerCase() ) >= 0 )
        );

        return matches;
	}
	
	public delete(itemQuery: string|number): Boolean {
        let deleted = false;
		
		this.list = this.list.filter( (el: any) => {
            let match = el.getId() === parseInt(itemQuery.toString())
                        || el.getName().toLowerCase() === itemQuery.toString().toLowerCase();

            if (deleted && !match) {

                el.id -= 1;
    
            }
            
            if (match) deleted = true;
                
			return !match
        } );

		return deleted;
	}
}