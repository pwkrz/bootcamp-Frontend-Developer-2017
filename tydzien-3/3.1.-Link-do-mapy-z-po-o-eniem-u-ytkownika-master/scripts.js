function BingMap(){
	
	this.button = document.querySelector("#button");
	this.map = document.querySelector("#map");
	
	this.button.onclick = this.loadMap.bind(this);

}

BingMap.prototype.appendLink = function(pos){
	
	if(!this.mapLink) this.createLink();
	
	this.mapLink.href = "http://bing.com/maps/default.aspx?cp=" + pos.coords.latitude + "~" + pos.coords.longitude;
	
};

BingMap.prototype.createLink = function(){
	
	this.mapLink = document.createElement("a");
	this.mapLink.innerText = "Open in Bing Maps";
	
	document.querySelector(".container").appendChild(this.mapLink);
	
};

BingMap.prototype.loadMap = function(){
	
	navigator.geolocation.getCurrentPosition(
		function(pos){
			this.map.setAttribute("src", "https://www.bing.com/maps/embed?h=400&w=1140&cp=" + pos.coords.latitude + "~" + pos.coords.longitude + "&lvl=11&typ=d&sty=h&src=SHELL&FORM=MBEDV8");
			this.appendLink(pos);
		}.bind(this),
		function(err){
			alert("Error: " + err.code + ". " + err.message)
		}
	);
	
};
	
			
window.onload = function(){
	
	var map1 = new BingMap()
	
};