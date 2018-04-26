String.prototype.repeatt = function(times){
	
	if("repeat" in String.prototype){
		
		return this.repeat(times);
		
	} else {

		var result = "";
		
		for(i=0; i<times; i++){
				
			result += this;
				
		};
	
		return result;
		
	}
	
}