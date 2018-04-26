class EventEmitter {

    constructor(){
		this.events = {};
	}

	on(type, fn) {
		if(!type || !fn) return;

		this.events[type] = this.events[type] || [];

		this.events[type].push(fn);
	}
	
	emit(type, data) {
		let fns = this.events[type];

		if(!fns || !fns.length) return;

		for(let fn of fns) {
			fn(data);
		}
	}
}

class Database extends EventEmitter {

	constructor(url){
		super()
		this.url = url;
	}
	
	connect() {
		this.emit("connect", this.url);
	};
	
	disconnect() {
		this.emit("disconnect", this.url);
	}

}

var ev = new EventEmitter();

ev.on("hello", function(message) {
    console.log(`Witaj ${message}!`);
});

ev.on("hello", function(message) {
    console.log(`Siema ${message}.`);
});

ev.on("goodbye", function() {
    console.log("Do widzenia!");
});

ev.emit("hello", "Marek");
ev.emit("goodbye");
ev.emit("custom"); // nic się nie wydarzy

var db = new Database("db://localhost:3000"); // fikcyjny adres

db.on("connect", function(url) {
    console.log(`Połączenie z bazą pod adresem ${url} zostało ustanowione.`);
});

db.on("disconnect", function(url) {
    console.log(`Połączenie z bazą pod adresem ${url} zostało zakończone.`);
});

db.connect();

setTimeout(function() {
    db.disconnect();
}, 5000);