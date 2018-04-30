import {BaseItem} from './baseModels/item';

export class Product extends BaseItem {

    private quantity: number = 0;
	
    constructor(id: number, name: string, quantity: number = 0) {
        super(id, name)

        this.quantity = quantity;
    }
    
    public getQuantity(){
		return this.quantity;
	}

    public updateQuantity(delta: number){
        this.quantity = this.quantity + delta;
    }
}