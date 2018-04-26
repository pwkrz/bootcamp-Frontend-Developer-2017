(function($){
	
	$(document).ready(function(){
		
		var input = $("#userInput"),
			button = $("#button"),
			ul = $("<ul>", {class: "list-group"}),
			form = $("#form")
		
		$(".container").append(ul);
		
		input.on("keydown", function(){
			
			$(this).removeClass("warning");
			input.attr("placeholder", "Type in anything...");
			
			
		});
		
		button.on("click", function(){
			
			if($.trim(input.val()) !== ""){
			
				var text = input.val();
			
				input.val("");
				
				var nowyElement = $("<li>", {
					
					class: "list-group-item",
					text: text,
					css: {
						
						"text-align": "center"
						
					}
				
				});
			
				ul.prepend(nowyElement);
				
			} else {
				
				input.addClass("warning");
				input.attr("placeholder", "The input field must contain at least 1 character...");
				input.val("");
				
			}
			
			input.focus();
			
		});
		
		
	});
	
})(jQuery);