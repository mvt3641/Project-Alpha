var mongoose =require('mongoose');


mongoose.Promise = Promise;
var connection = mongoose.connect("mongodb://localhost/PGSStestdb")
.then(function(){
console.log("database connected..");
});


  module.exports = connection;
