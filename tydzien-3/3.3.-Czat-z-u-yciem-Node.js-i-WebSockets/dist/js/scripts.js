function newElement(type, classArray){

	var el = document.createElement(type);

	classArray.forEach(function(classItem){

		if (Array.isArray(classItem)) {

			if (classItem[1]) el.classList.add(classItem[0])

		} else {

			el.classList.add(classItem)

		}
	});

	return el;
};

function appendPolyfill(parent, childArray){

	if( !( parent.nodeType
			&& Array.isArray(childArray)
			&& childArray.every( function(el){ return Boolean(el.nodeType) } ) ) ){

		return false;

	} else {

		childArray.forEach( function(el){

			parent.appendChild(el);

		} );
	}
}

function removeClass(className){

	if ( this.classList && this.classList.contains(className) ) {

		this.classList.remove(className);
		
	}
}

window.onload = function(){
	
	function Chat(){
		
		this.checkWsSupport();

		this.nickForm = document.querySelector("#nickForm");
		this.nickInput = this.nickForm.querySelector("input");
		this.messageForm = document.querySelector("#messageForm");
		this.messageInput = this.messageForm.querySelector("input");
		this.sendButton = this.messageForm.querySelector("button");
		this.chatWindow = document.querySelector("#chatWindow");
		
		this.nickForm.onsubmit = this.joinChat.bind(this);
		this.nickInput.onkeypress = removeClass.bind(this.nickForm, "has-error");
		this.messageInput.onkeypress = removeClass.bind(this.messageForm, "has-error");
	};



	Chat.prototype.checkWsSupport = function(){

		if( !window.WebSocket ){
			document.write("Your browser does not support the HTML5 websocket technology. Please consider switching\
			 to the latest version of Chrome or Firefox.");
		} else {
			return true;
		}

	};

	Chat.prototype.validation = function(el, warning){
		
		el.classList.add("has-error");

		el.querySelector("small").innerText = warning;
		
		el.querySelector("input").focus();
		
		return;
	};

	Chat.prototype.scrollTopChatWindow = function(){

		this.chatWindow.scrollTop = this.chatWindow.scrollHeight;

	};

	Chat.prototype.newChatOutput = function(data){
		
		var selfCheck = data.nick ? data.nick === this.nick : false;
			newOutput = newElement("div", ["chat-row", ["chat-row-self", selfCheck]]),
			clearfix = newElement("div", ["clearfix"]),
			nick = selfCheck ? "You" : data.nick;

		switch(data.type){
			case "status":
			case "accepted":
				var status = data.nick ? nick + " " + data.message : data.message;
				newOutput.innerHTML = '<span class="status">' + status + '</span>';
				break;
			case "message":
				var date = new Date(),
					currTime = date.toTimeString().split(" ")[0];
					
				newOutput.innerHTML = '<span class="time">' + currTime + '</span><span class="name">' + nick + ": " + 
				'</span><span class="message">' + data.message + '</span>';
				break;
		}

		appendPolyfill(this.chatWindow, [newOutput, clearfix]);

		this.scrollTopChatWindow();
	};

	Chat.prototype.blockForms = function(){
		
		Array.prototype.forEach.call(arguments, function(el, i){
			
			if(el.nodeName === "INPUT") {
				el.setAttribute("readonly", true);
			} else if(el.nodeName === "BUTTON"){
				el.setAttribute("disabled", true);
			};
		});	
	};

	Chat.prototype.unblockForms = function(){
		
		Array.prototype.forEach.call(arguments, function(el, i){
			
			if(el.nodeName === "INPUT") {
				el.removeAttribute("readonly");
			} else if(el.nodeName === "BUTTON"){
				el.removeAttribute("disabled");
			};
		});
	};

	Chat.prototype.joinChat = function(e){
		
		e.preventDefault();
		
		this.nick = this.nickInput.value.trim();
		
		if(this.nick.length < 3){

			this.validation(e.target, "Nickname must be at least 3 characters long.");
		
		} else {

			this.ws = new WebSocket("ws://localhost:3000", "magic-ws-protocol");
			
			this.ws.onopen = this.validateConnection.bind(this);
			this.ws.onmessage = this.dataReceivedHandler.bind(this);
			this.ws.onclose = this.socketCloseHandler.bind(this);
		
		}
	};

	Chat.prototype.validateConnection = function(e){

		this.sendToServer({
				
			type: "validation",
			nick: this.nick
			
		});

	};

	Chat.prototype.startChat = function(){
		
		this.blockForms(this.nickInput, this.nickForm.querySelector("button"));
		this.unblockForms(this.messageInput, this.sendButton);
		
		this.messageInput.focus();
		
		this.messageForm.onsubmit = this.submitMessage.bind(this);
			
	};

	Chat.prototype.submitMessage = function(e){
		
		e.preventDefault();
		
		this.txt = this.messageInput.value.trim();
		
		this.messageInput.value = "";
		
		this.messageInput.focus();
		
		if(this.txt.length < 1){
			this.validation(e.target, "Your message must contain at least 1 letter.")
		} else {
			
			this.sendToServer({
				type: "message",
				nick: this.nick,
				message: this.txt
			})
			
		}
		
	};

	Chat.prototype.sendToServer = function(data){
		
		this.ws.send(JSON.stringify(data));
		
	};

	Chat.prototype.dataReceivedHandler = function(e){

		var data = JSON.parse(e.data);

		switch(data.type){
			case "nickError":
				this.validation(this.nickForm, data.message);
				break;
			case "accepted":
				this.startChat();
				this.newChatOutput(data);
				break;
			default:
				this.newChatOutput(data);
		}
	};

	Chat.prototype.socketCloseHandler = function(closeEvent){

		// TEMPORARY SOLUTION !!!
		if(closeEvent.reason === "Nickname already in use.") return;
		
		this.nickInput.value = "";
		
		this.blockForms(this.nickInput, this.nickForm.querySelector("button"), this.messageInput, this.sendButton);
		
		this.newChatOutput({
				
				type: "status",
				message: "SERVER UNAVAILABLE!"
				
		})
	};

		
	var Chat = new Chat();
	
};