// class Customers extends baseList

import {Customer} from "./customer";

export class Customers {
	private customerList: Array<Customer>;
	
	constructor(customers: Array<Customer> = []){
		this.customerList = new Array<Customer>();
		
		customers.forEach( customer => this.customerList.push(customer) )
	}
	
	public list(): Array<Customer> {
		return this.customerList
	}
	
	public add(customerName: string, email: string): Array<Customer> {
		let customerIds: Array<number> = this.customerList.map( cust => cust.getId() )
		let customerId: number = Math.max(...customerIds) + 1;
		
		let customer = new Customer(customerId, customerName, email)
		
		this.customerList.push(customer);
		
		return this.customerList;
	}

	public modifyemail(customerName: string, newEmail: string) {
        for(let customer of this.customerList){
            if(customerName === customer.name) { customer.setEmail(newEmail) }
        }
    }
	
	public fetch(customerId: number): Customer {
		return customerId && this.customerList.filter( 
			(val: Customer) => val.getId() === customerId
		).shift();
	}
	
	public find(customer: string): Customer {
		return customer && this.customerList.filter( 
			(val: Customer) => ( val.getId() === parseInt(customer)
				|| val.getName().toLowerCase() === customer.toLowerCase() )
		).shift();
	}
	
	public delete(customerId: number): Boolean {
		let deleted = false;
		
		this.customerList = this.customerList.filter( function(val: Customer){
			deleted = val.getId() === customerId
			return val.getId() !== customerId
		} );
		
		return deleted;
	}
}