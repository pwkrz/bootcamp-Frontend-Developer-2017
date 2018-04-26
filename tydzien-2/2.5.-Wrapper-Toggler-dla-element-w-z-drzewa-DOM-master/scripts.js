window.onload = function(){

function Toggler(selector){
	
	var selectedElements = document.querySelectorAll(selector);

	this.getElem = function(i){
	
		return selectedElements[i]
		
	};
	
	this.show = function(){
		
		for(i=0; i < selectedElements.length; i++){
			selectedElements[i].style.display = "block";
		}
		
		return this
		
	}
	
	this.hide = function(){
		
		for(i=0; i < selectedElements.length; i++){
			selectedElements[i].style.display = "none";
		}
		
		return this
		
	}
}


var input = document.querySelector("#input");
var button = document.querySelector("#button");
var buttonText = button.querySelector("span");

button.addEventListener("click", function() {

	if( !(document.querySelector(input.value)) ){

		alert("No elements found.");

		return false;

	};

	var flag = true;

	if( !(/h1|section/.test(input.value)) ){

		flag = confirm("Are you sure?");

	};

	if(flag){

		var elem = new Toggler(input.value);

		elem.prototype = Object.create(Toggler.prototype);

		elem.prototype.constructor = elem;

		if(elem.getElem(0).style.display == "none"){
			buttonText.textContent = "Hide";
			elem.show();
		} else {
			buttonText.textContent = "Show";
			elem.hide();
		}
		
		this.blur();

	}

}, false);

}