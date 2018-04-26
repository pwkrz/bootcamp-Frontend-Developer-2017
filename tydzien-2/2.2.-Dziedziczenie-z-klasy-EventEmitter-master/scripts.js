function EventEmitter() {

    this.events = {};

};

EventEmitter.prototype.on = function(type, fn) {

    if(!type || !fn) return;
	
    this.events[type] = this.events[type] || [];
    this.events[type].push(fn);

};

EventEmitter.prototype.emit = function(type, data) {

    var fns = this.events[type];

    if(!fns || !fns.length) return;

    for(var i = 0; i < fns.length; i++) {
        fns[i](data);
    }

};

function Database(url) {
	
	EventEmitter.call(this);
    this.url = url;

};

Database.prototype = Object.create(EventEmitter.prototype);
Database.prototype.constructor = Database;

Database.prototype.connect = function() {

    // simulated connection to database

    this.emit("connect", this.url);

};

Database.prototype.disconnect = function() {

    // simulated disconnection from database

    this.emit("disconnect", this.url);

};

// Create instance of EventEmitter
var ev = new EventEmitter();

ev.on("hello", function(message) {
    console.log("Hello " + message + "!");
});

ev.on("hello", function(message) {
    console.log("Hi there " + message + ".");
});

ev.on("goodbye", function() {
    console.log("Goodbye!");
});

ev.emit("hello", "Marek");
ev.emit("goodbye");
ev.emit("custom"); // nothing happens

// TO DO!
// Example use of the Database class
var db = new Database("db://localhost:3000"); // fictional address

db.on("connect", function(url) {
    console.log("Connection to database at " + url + " established.");
});

db.on("disconnect", function(url) {
    console.log("Connection to database at " + url + " ended.");
});

db.connect();

// disconnection after 5 seconds
setTimeout(function() {
    db.disconnect();
}, 5000);