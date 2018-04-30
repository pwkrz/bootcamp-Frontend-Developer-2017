import {Item} from "./types"

export class BaseItem implements Item {
	protected id: number;
	protected name: string;
	
	constructor(id: number = 0, name: string) {
		this.id = id;
		this.name = name;
	}
	
	public getId() : number {
		return this.id;
	}
	
	public setId(newId: number) : boolean {
		this.id = newId;

		return this.id === newId;
	}
	
	public getName() : string {
		return this.name;
	}

	public setName(newName: string) : boolean {
		this.name = newName;

		return this.name === newName
	}
}