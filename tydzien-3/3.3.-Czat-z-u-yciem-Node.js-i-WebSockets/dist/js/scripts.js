window.onload = function(){
	
	function Chat(){
		
		if(!window.WebSocket) document.write("Your browser does not support the HTML5 websocket technology. Please consider switching to the latest version of Chrome or Firefox.");

		this.nickForm = document.querySelector("#nickForm");
		this.nickInput = this.nickForm.querySelector("input");
		this.messageForm = document.querySelector("#messageForm");
		this.messageInput = this.messageForm.querySelector("input");
		this.sendButton = this.messageForm.querySelector("button");
		this.chatWindow = document.querySelector("#chatWindow");
		
		this.sendButton.setAttribute("disabled", true);
		
		this.nickForm.onsubmit = this.joinChat.bind(this);
		
	};

	Chat.prototype.validation = function(e){
		
		var cel = e.target;
		
		cel.classList.add("has-error");
		
		cel.querySelector("input").focus();
		
		cel.querySelector("input").onkeypress = function(){
			this.classList.remove("has-error");		
		}.bind(cel);
		
		return;
		
	};

	Chat.prototype.newChatOutput = function(data){
		
		var newOutput = document.createElement("div"),
			clearfix = document.createElement("div"),
			date = new Date(),
			currTime = date.toTimeString().split(" ")[0];
			
		clearfix.classList.add("clearfix");
			
		if(data.message.indexOf(this.nick) > -1 || data.nick === this.nick){
			newOutput.classList.add("chatRowSelf");
		} else {
			newOutput.classList.add("chatRow");
		};
		
		var nick = data.nick && data.nick === this.nick ?  "You" : data.nick;

		if(data.type === "status"){

			var status = data.nick ? nick + " " + data.message : data.message;

			newOutput.innerHTML = '<span class="status">' + status + '</span>';

		} else if(data.type === "message"){

			newOutput.innerHTML = '<span class="time">' + currTime + '</span><span class="name">' + nick + ": " + '</span><span class="message">' + data.message + '</span>';
		}
		this.chatWindow.appendChild(newOutput);
		this.chatWindow.appendChild(clearfix);
		
		this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
		
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
		
		if(this.nick === ""){
			this.validation(e)
		
		} else {

			this.ws = new WebSocket("ws://localhost:3000", "magic-ws-protocol");
			
			this.ws.onopen = this.socketOpenHandler.bind(this);
			this.ws.onmessage = this.dataReceivedHandler.bind(this);
			this.ws.onclose = this.socketCloseHandler.bind(this);
		
		}
	};

	Chat.prototype.socketOpenHandler = function(e){
		
		this.blockForms(this.nickInput, this.nickForm.querySelector("button"));
		this.unblockForms(this.messageInput, this.sendButton);
		
		this.messageInput.focus();

		this.sendToServer({
				
				type: "status",
				nick: this.nick,
				message: "joined the chat!"
				
		});
		
		this.messageForm.onsubmit = this.submitMessage.bind(this);
			
	};

	Chat.prototype.submitMessage = function(e){
		
		e.preventDefault();
		
		this.txt = this.messageInput.value.trim();
		
		this.messageInput.value = "";
		
		this.messageInput.focus();
		
		if(this.txt === ""){ this.validation(e) } else {
			
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

		this.newChatOutput(JSON.parse(e.data));

	};

	Chat.prototype.socketCloseHandler = function(e){
		
		this.nickInput.value = "";
		
		this.blockForms(this.nickInput, this.nickForm.querySelector("button"), this.messageInput, this.sendButton);
		
		this.newChatOutput({
				
				type: "status",
				message: "SERVER UNAVAILABLE!"
				
		})
		
	};

		
	var Chat = new Chat();
	
};