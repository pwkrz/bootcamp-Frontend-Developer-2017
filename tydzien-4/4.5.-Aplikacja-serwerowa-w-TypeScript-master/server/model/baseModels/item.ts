// getProp(propName: string){}

export class BaseItem {
	private id: number;
	
    constructor(id: number = 0, public name: string) {
		this.id = id;
    }
	
	public getId(){
		return this.id;
	}
	
	public setId(newId: number){
		this.id = newId;
	}
	
	public getName(){
		return this.name;
	}
	public setName(newName: string){
		this.name = newName;
    }
}