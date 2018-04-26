window.onload = function(){

function Toggler(selektor){
	
	var wybraneElementy = document.querySelectorAll(selektor);
	
	this.getElem = function(i){
		
		return wybraneElementy[i]
		
	};
	
	this.show = function(){
		
		for(i=0; i < wybraneElementy.length; i++){
			wybraneElementy[i].style.display = "block";
		}
		
		return this
		
	}
	
	this.hide = function(){
		
		for(i=0; i < wybraneElementy.length; i++){
			wybraneElementy[i].style.display = "none";
		}
		
		return this
		
	}
	
	
}


var elem = new Toggler("#section");

elem.prototype = Object.create(Toggler.prototype);

elem.prototype.constructor = elem;

var button = document.querySelector("#button");

var tekstGuzika = button.querySelector("span");

button.addEventListener("click", function(e) {	

    if(elem.getElem(0).style.display == "none"){
		tekstGuzika.textContent = "Ukryj";
		elem.show();
    } else {
		tekstGuzika.textContent = "Pokaż";
        elem.hide();
    }
	
	this.blur();

}, false);

}