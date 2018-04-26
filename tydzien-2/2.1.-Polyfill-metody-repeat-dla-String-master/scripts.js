String.prototype.repeatt = function(times){
	
	var wynik = "";
	
	if(!("repeatt" in Array)){
	
		for(i=0; i<times; i++){
				
			wynik = wynik + this;
				
		};
	
	return wynik;
		
	} else {
		
		return this.repeatt(times);
		
	}
	
}