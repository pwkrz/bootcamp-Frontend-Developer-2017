function aport(url, sukces, blad){
	
	if (window.XMLHttpRequest) {
		
		var xhr = new XMLHttpRequest();
		
		xhr.open("GET", url, true);
		
		xhr.onreadystatechange = function(){
			
			if(xhr.status === 200 && xhr.readyState === 4){
				
				sukces(xhr.response);
				
			} else if(xhr.status >= 300 && xhr.readyState === 4) { 
			
				blad(xhr) 
				
			} else { 
				
				console.log("Przetwarzanie...")
			
			};
			
		};
		
		xhr.send(null);
		
	} else { return };
	
};

aport("https://jsonplaceholder.typicode.com/userss", function(data) {
console.log("Sukces");
console.log(data);
}, function(err) {
console.log("Wystąpił błąd!");
console.log(err);
});