export interface Item {
	
	getId() : number;

	setId(newId: number) : boolean;
	
    getName() : string;
    
	setName(newName: string) : boolean;
}

export interface ItemInstance extends Item {
    
    new (id: number, name: string, otherProp?: any) : void;

    [propName: string]: any;
}