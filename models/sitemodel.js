var mongoose = require('mongoose');


var siteinfoSchema = mongoose.Schema({
   // _id: mongoose.Schema.Types.ObjectId,

sitename:{
  type: {}
},
hub: {
  type: String,
  unique: true
},
system: {
  type:{}
},
supportingunit:{
  type:{}
},
flightdata: [
    {
      // Store ObjectIds in the array
      type: mongoose.Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the flightrec model
      ref: "flightrec"
    }
  ]
});

var siteinfo = mongoose.model('siteinfo',siteinfoSchema,"Sitestats");

module.exports = siteinfo;
