import {BaseItem} from './baseModels/item';

export class Product extends BaseItem {
	
    constructor(id: number, public name: string, public quantity: number = 0) {
        super(id, name)
    }
    
    public getQuantity(){
		return this.quantity;
	}

    public updateQuantity(delta: number){
        this.quantity = this.quantity + delta;
    }
}