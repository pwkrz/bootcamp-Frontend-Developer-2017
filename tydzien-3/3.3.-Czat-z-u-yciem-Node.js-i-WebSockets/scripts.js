window.onload = function(){
	
function Czat(){
	
	if(!window.WebSocket) return;

	this.nickForm = document.querySelector("#nickForm");
	this.nickInput = this.nickForm.querySelector("input");
	this.messageForm = document.querySelector("#messageForm");
	this.messageInput = this.messageForm.querySelector("input");
	this.sendButton = this.messageForm.querySelector("button");
	this.chatWindow = document.querySelector("#chatWindow");
	
	this.sendButton.setAttribute("disabled", true);
	
	this.nickForm.onsubmit = this.dolacz.bind(this);
	
};

Czat.prototype.walidacja = function(e){
	
	var cel = e.target;
	
	cel.classList.add("has-error");
	
	cel.querySelector("input").focus();
	
	cel.querySelector("input").onkeypress = function(){
		this.classList.remove("has-error");		
	}.bind(cel);
	
	return;
	
};

Czat.prototype.wierszOknaCzatu = function(dane){
	
	var linijkaCzatu = document.createElement("div"),
		clearfix = document.createElement("div"),
		data = new Date(),
		czas = data.toTimeString().split(" ")[0];
		
	clearfix.classList.add("clearfix");
		
	if(dane.message.indexOf(this.nick) > -1 || dane.nick === this.nick){
		linijkaCzatu.classList.add("chatRowSelf");
	} else {
		linijkaCzatu.classList.add("chatRow");
	};
	
	if(dane.type === "status"){
		linijkaCzatu.innerHTML = '<span class="status">' + dane.message + '</span>';
	} else if(dane.type === "message"){
		var nick = dane.nick != this.nick ? nick = dane.nick + ":" : nick = "Ty:";
		linijkaCzatu.innerHTML = '<span class="time">' + czas + '</span><span class="name">' + nick + '</span><span class="message">' + dane.message + '</span>';
	}
	this.chatWindow.appendChild(linijkaCzatu);
	this.chatWindow.appendChild(clearfix);
	
	this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
	
};

Czat.prototype.zablokujPola = function(){
	
	Array.prototype.forEach.call(arguments, function(el, i){
		
		if(el.nodeName === "INPUT") {
			el.setAttribute("readonly", true);
		} else if(el.nodeName === "BUTTON"){
			el.setAttribute("disabled", true);
		};
		
	});
	
};

Czat.prototype.odblokujPola = function(){
	
	Array.prototype.forEach.call(arguments, function(el, i){
		
		if(el.nodeName === "INPUT") {
			el.removeAttribute("readonly");
		} else if(el.nodeName === "BUTTON"){
			el.removeAttribute("disabled");
		};
		
	});
	
};

Czat.prototype.dolacz = function(formularz1){
	
	formularz1.preventDefault();
	
	this.nick = this.nickInput.value.trim();
	
	if(this.nick === ""){ this.walidacja(formularz1) } else {

	this.ws = new WebSocket("ws://localhost:8001");
	
	this.ws.onopen = this.otwarciePolaczenia.bind(this);
	this.ws.onmessage = this.daneZserwera.bind(this);
	this.ws.onclose = this.serwerNiedostepny.bind(this);
	
	}
	
};

Czat.prototype.otwarciePolaczenia = function(e){
	
	this.zablokujPola(this.nickInput, this.nickForm.querySelector("button"));
	this.odblokujPola(this.messageInput, this.sendButton);
	
	this.messageInput.focus();

	this.daneDoSerwera({
			
			type: "status",
			message: this.nick + " dołączył(a) do czatu"
			
	});
	
	this.messageForm.onsubmit = this.wiadomoscWychodzaca.bind(this);
		
};

Czat.prototype.wiadomoscWychodzaca = function(formularz2){
	
	formularz2.preventDefault();
	
	this.txt = this.messageInput.value.trim();
	
	this.messageInput.value = "";
	
	this.messageInput.focus();
	
	if(this.txt === ""){ this.walidacja(formularz2) } else {
		
		this.daneDoSerwera({
			type: "message",
			nick: this.nick,
			message: this.txt
		})
		
	}
	
};

Czat.prototype.daneDoSerwera = function(dane){
	
	this.ws.send(JSON.stringify(dane));
	
};

Czat.prototype.daneZserwera = function(e){ 

	this.wierszOknaCzatu(JSON.parse(e.data));

};

Czat.prototype.serwerNiedostepny = function(e){
	
	this.nickInput.value = "";
	
	this.zablokujPola(this.nickInput, this.nickForm.querySelector("button"), this.messageInput, this.sendButton);
	
	this.wierszOknaCzatu({
			
			type: "status",
			message: "SERWER NIEDOSTĘPNY!"
			
	})
	
};

	
var czat = new Czat();
	
};