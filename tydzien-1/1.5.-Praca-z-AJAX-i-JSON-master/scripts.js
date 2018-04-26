jQuery(function($){
	
	var button = $("#button"),
		listWrapper = $("#listWrapper");

	function isFirefox(){

		return window.navigator.userAgent.includes("Firefox")

	};

	function checkBrowserSupport(){

		if( !(isFirefox()) ) {

			$('#browserWarning').modal("show");

		}
	};
	
	function appendUserData(){
		
		var ul = $("<ul>", {
			class: "list-group col-md-4"
		});
					
		var nameItem = $("<li>", {class: "list-group-item"}).text("name: "+this.name);
		var usernameItem = $("<li>", {class: "list-group-item"}).text("username: "+this.username);
		var emailItem = $("<li>", {class: "list-group-item"}).text("email: "+this.email);
		var phoneItem = $("<li>", {class: "list-group-item"}).text("phone: "+this.phone);
				
		ul.append(nameItem).append(usernameItem).append(emailItem).append(phoneItem).appendTo(listWrapper);
		
	};

	checkBrowserSupport();
		
	button.on("click", function(){
		
		listWrapper.empty();
		
		$.ajax({
			
			url: "https://jsonplaceholder.typicode.com/users",
			type: "GET",
			success: function(data, status, jqXHR){
				$.each(data, appendUserData);
			},
			error: function(err){
				console.log(err);
			}
			
		});
		
	});	
		
		
});