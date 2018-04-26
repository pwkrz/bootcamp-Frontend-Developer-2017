function createData(obj) {

    var data = obj;
	
	this.set = function(prop, val){
		
		if(!prop || !val){
			
			var args = prompt('Provide 2 values separated by a space.')
			
			data[args.split(" ")[0]] = args.split(" ")[1]
									
		} else {
			
			data[prop] = val;
			
		}
		
	}
	
	this.get = function(prop){
		
		return data[prop]
		
	}

}

var data = new createData({});

data.set("name", "Tomek");
data.set("lastName", "Osobowski");

console.log( data.get("name") );
console.log( data.get("lastName") );