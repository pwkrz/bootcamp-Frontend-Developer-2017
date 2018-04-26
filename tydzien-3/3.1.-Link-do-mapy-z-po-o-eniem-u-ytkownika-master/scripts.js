function MapaBing(){
	
	this.guzik = document.querySelector("#guzik");
	this.mapa = document.querySelector("#mapa");
	this.pojemnikNaMape = document.querySelector("#pojemnikNaMape");
	
	this.guzik.onclick = this.ladowanieMapy.bind(this);

}

MapaBing.prototype.dodajLink = function(poz){
	
	if(!this.odnosnik) this.zrobLink();
	
	this.odnosnik.href = "http://bing.com/maps/default.aspx?cp=" + poz.coords.latitude + "~" + poz.coords.longitude;
	
};

MapaBing.prototype.zrobLink = function(){
	
	this.odnosnik = document.createElement("a");
	this.odnosnik.innerHTML = "Otwórz w Bing Maps";
	
	document.querySelector(".container").appendChild(this.odnosnik);
	
};

MapaBing.prototype.ladowanieMapy = function(){
	
	navigator.geolocation.getCurrentPosition(
		function(poz){
			this.mapa.setAttribute("src", "https://www.bing.com/maps/embed?h=400&w=1140&cp=" + poz.coords.latitude + "~" + poz.coords.longitude + "&lvl=11&typ=d&sty=h&src=SHELL&FORM=MBEDV8");
			this.dodajLink(poz);
		}.bind(this),
		function(err){
			alert("Wystąpił błąd: " + err.code + ". " + err.message)
		}
	);
	
};

MapaBing.prototype.constructor = MapaBing;
	
			
window.onload = function(){
	
	var mapa1 = new MapaBing()
	
};