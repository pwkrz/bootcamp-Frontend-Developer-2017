const express = require("express"),
      app = express();

app.get("/", function(req, res){

    res.send("Działa!")

});

app.listen(3000, function(){

    console.log("Serwer nasłuchuje na porcie 3000")

})