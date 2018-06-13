var mongoose = require('mongoose');





  // _id: mongoose.Schema.Types.ObjectId,
var flightrecSchema = mongoose.Schema({

 // _id: mongoose.Schema.Types.ObjectId,

dateLogged: {
  type:{},
},
User: {
  type: String
},
Time: {
  type: Number
},
system:{
  type: String
},
systemStatus: {
  type: {}
},
flightAltitude:{
  type: Number
},
reasonMoored: {
  type: {}
},
Launches:{
  type: Number
},
recoveries:{
  type: Number
},
tetherTension:{
  type: Number
},
groundWinds: {
  type: Number
},
windsAloft:{
  type: Number
},
groundTemp:{
  type: Number
},
barometricPressure:{
  type: Number
},
pitch:{
  type: Number
},
heliumPressure:{
  type: Number
},
ballonetPressure:{
  type: Number
},
notes:{
  type: String
}

});


var flightrec = mongoose.model("flightrec",flightrecSchema);

module.exports= flightrec;
