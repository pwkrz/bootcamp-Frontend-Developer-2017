import {BaseList} from "./baseModels/list";
import {Customer} from "./customer";

export class Customers extends BaseList {
	
	constructor(customers: Array<Customer> = []){
		super(customers);
	}
	
	public add(customerName: string, email: string): Array<Customer> {
		
		let customerId: number = this.getMaxId() + 1;
		
		this.list.push( new Customer(customerId, customerName, email) );
		
		return this.list;
	}

	public modifyemail(customerName: string, newEmail: string) {
        for(let customer of this.list){
            if(customerName === customer.name) { customer.setEmail(newEmail) }
        }
    }
}