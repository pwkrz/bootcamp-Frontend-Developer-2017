(function($){
	
	$(document).ready(function(){
		
		var menu = $("#menu"),
			hamburger = $("#hamburger");
		
		var lis = menu.find("li");
		
		lis.hover(function(e){
			
			$(this).css({
				
				"padding-left": "20px",
				"border-left": "15px solid #343a40",
				"border-top": "1px dashed #343a40",
			}).prev("li").css("border-bottom", 0);
						
		}, function(e){
			
			$(this).css({
				
				"padding-left": "",
				"border-left": "",
				"border-top": "",
			}).prev("li").css("border-bottom", "");
			
		});
		
		hamburger.on("click", function(){
			
			menu.stop().slideToggle();
			
			$(this).toggleClass("glyphicon-menu-hamburger");
			
			$(this).toggleClass("glyphicon-remove");
			
		});
		
		
	});
	
})(jQuery);