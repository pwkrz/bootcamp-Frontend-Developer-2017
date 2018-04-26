jQuery(function($){
	
	var button = $("#button"),
		// nowyElement = $("<li>", {class: "list-group-item"});
		skrzynkaNaListy = $("#skrzynkaNaListy")
	
	function uzytkownik(){
		
		var ul = $("<ul>", {
			class: "list-group col-md-4",
			display: "block",
			float: "left"
		});
					
		var liJeden = $("<li>", {class: "list-group-item"}).text("name: "+this.name);
		var liDwa = $("<li>", {class: "list-group-item"}).text("username: "+this.username);
		var liTrzy = $("<li>", {class: "list-group-item"}).text("email: "+this.email);
		var li4 = $("<li>", {class: "list-group-item"}).text("telefon: "+this.phone);
				
		ul.append(liJeden).append(liDwa).append(liTrzy).append(li4).appendTo(skrzynkaNaListy);
		
	};
		
	button.on("click", function(){
		
		skrzynkaNaListy.empty();
		
		$.ajax({
			
			url: "https://jsonplaceholder.typicode.com/users",
			type: "GET",
			success: function(data, status, jqXHR){	$.each(data, uzytkownik);},
			
		});
		
	});	
		
		
});