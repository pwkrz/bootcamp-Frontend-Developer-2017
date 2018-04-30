import {Products} from './products';
import {Product} from './product';
import {BaseItem} from './baseModels/item';

export class Customer extends BaseItem {
    private ownedProducts : Products;
    private email : string;

    constructor(id : number, name : string, email: string) {
        super(id, name)
 
        this.ownedProducts = new Products();
        this.email = email;
    }
    
    public getEmail() {
        return this.email;
    }

    public setEmail(newEmail: string) {
        this.email = newEmail;
    }

    public addProducts(productName: string, quantity: number) {

        this.ownedProducts.add(productName, quantity)
    }

    public updateProdQuantity(productName: string, quantity: number) {
        
        this.ownedProducts.modifyQuantity(productName, quantity)

    }

    public deleteProducts(productName: string): Boolean {

        return this.ownedProducts.delete(productName)

    }

    public getAllProducts() {

        return this.ownedProducts.getList();
    }

    public getProduct(productQuery: string) {
        
        return this.ownedProducts.find(productQuery)

    }
}