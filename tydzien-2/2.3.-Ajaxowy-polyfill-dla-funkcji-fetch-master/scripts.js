function fetchIt(url, onSuccess, onError){
	
	if (window.XMLHttpRequest) {
		
		var xhr = new XMLHttpRequest();
		
		xhr.open("GET", url, true);
		
		xhr.onreadystatechange = function(){
			
			if(xhr.status === 200 && xhr.readyState === 4){
				
				onSuccess(xhr.response);
				
			} else if(xhr.status >= 300 && xhr.readyState === 4) { 
			
				onError(xhr) 
				
			} else { 
				
				console.log("Processing...")
			
			};
			
		};
		
		xhr.send(null);
		
	} else { return };
	
};

fetchIt("https://jsonplaceholder.typicode.com/users", function(data) {
		console.log("Success");
		console.log(data);
	}, function(err) {
		console.log("Error occurred!");
		console.log(err);
});