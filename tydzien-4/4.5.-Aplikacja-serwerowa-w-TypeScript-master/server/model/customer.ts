// Listowanie, pobieranie 1, tworzenie, zmiana, usuwanie + getProp("email")
// import * as ProductModel from './product';
import {Products} from './products';
import {Product} from './product';
import {baseItem} from './baseModels/item';

export class Customer extends baseItem {
    private ownedProducts : Products

    constructor(id : number, public name : string, public email: string) {
        super(id, name)
 
        this.ownedProducts = new Products();
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

    public getAllProducts() : Array<Product> {
        return this.ownedProducts.list();
    }

    public getProduct(productQuery: string): Product {
        
        return this.ownedProducts.find(productQuery)

    }
}