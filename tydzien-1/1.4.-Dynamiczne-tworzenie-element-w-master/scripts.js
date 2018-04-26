(function($){
	
	$(document).ready(function(){
		
		var input = $("#pole"),
			button = $("#button"),
			ul = $("<ul>", {class: "list-group"}),
			form = $("#form")
		
		$(".container").append(ul);
		
		input.on("keydown", function(){
			
			$(this).removeClass("warning");
			input.attr("placeholder", "wpisz tekst, który zostanie wstawiony poniżej...");
			
			
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
				input.attr("placeholder", "pole nie może być puste...");
				input.val("");
				
			}
			
			input.focus();
			
		});
		
		
	});
	
})(jQuery);