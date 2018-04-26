﻿function LocalDB(dbName){
	
	this.dbName = dbName;
	
	this.DB = {};
	
};

LocalDB.prototype.save = function(subDBname, subDB){
	
	if(subDBname in this.DB) { alert("Klucz " + subDBname + " jest już w użyciu!"); return }
		
	this.DB[subDBname] = subDB;
	
	var DBstring = JSON.stringify(this.DB);
	
	window.localStorage.setItem(this.dbName, DBstring);
	
};

LocalDB.prototype.get = function(subDBname){
	
	var DBrecovery = JSON.parse(window.localStorage.getItem(this.dbName));
	
	console.log(DBrecovery[subDBname]);
	
}

// Tworzona jest nowa instancja,
// w której należy zapamiętać nazwę "DB1"
if("Storage" in window) var DB1 = new LocalDB("DB1");
else alert("Twoja przeglądarka nie wspiera Web Storage")

// Jakiś obiekt do zapisania
var janek = {
    firstName: "Jan",
    lastName: "Kowalski",
    age: 32
};

// Na prototypie LocalDB znajdować się
// musi metoda save, która przyjmuje
// parę klucz-wartość, a wartość powinna
// być przed zapisaniem przepuszczona
// przez JSON.stringify
// DB1.save("janek", janek);

// Prototyp LocalDB powinien również
// posiadać metodę get, która odczyta
// podany klucz, przepuszczając wartość
// przez JSON.parse
// DB1.get("janek");

// Porada. Aby móżna było tworzyć bazy danych
// o różnych nazwach, przy zapisywaniu poszczególnych
// danych, do klucza dodawaj nazwę bazy danych,
// np. "DB1.janek"