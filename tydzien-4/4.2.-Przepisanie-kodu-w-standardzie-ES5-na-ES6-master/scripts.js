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

		fns.forEach( fn => fn(data) );
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

ev.on("hello", (message) => console.log(`Welcome ${message}!`));

ev.on("hello", (message) => console.log(`Hi there ${message}.`));

ev.on("goodbye", () => console.log("Goodbye!"));

ev.emit("hello", "Marek");
ev.emit("goodbye");
ev.emit("custom"); // nothing happens

var db = new Database("db://localhost:3000"); // fictional address

db.on("connect", (url) => console.log(`Connection to database at ${url} established.`));

db.on("disconnect", (url) => console.log(`Connection to database at ${url} ended.`));

db.connect();

setTimeout( () => db.disconnect(), 5000 );