import {BaseList} from "./baseModels/list";
import {Customer} from "./customer";

export class Customers extends BaseList {
	// private customerList: Array<Customer>;
	
	constructor(customers: Array<Customer> = []){
		super(customers);
		// this.customerList = new Array<Customer>();
		
		// customers.forEach( customer => this.customerList.push(customer) )
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