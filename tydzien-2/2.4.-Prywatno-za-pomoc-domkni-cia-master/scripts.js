function createData(obj) {

    var data = obj;
	
	this.set = function(klucz, wart){
		
		if(!klucz || !wart){
			
			var args = prompt('Podaj obie wartości oddzielone spacją')
			
			data[args.split(" ")[0]] = args.split(" ")[1]
									
		} else {
			
			data[klucz] = wart;
			
		}
		
	}
	
	this.get = function(klucz){
		
		return data[klucz]
		
	}

}

var data = new createData({});

data.set("name", "Tomek");
data.set("nazwisko", "Osobowski");

console.log( data.get("name") );
console.log( data.get("nazwisko") );