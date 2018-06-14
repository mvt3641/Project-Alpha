//requiring express for routing and server services
var express = require('express');
var mongoose = require('mongoose');
// var siteinfo = require('../models/sitemodel');
// // Import models
// var flightrec = require('../models/flightrecmodel');
//var ----- = require('../models/ ex.flightmodel')
//requring the mongodb database connection
var dbconnect = require('../config/connection');
var db = require('../models');

mongoose.Promise = Promise;
//creating a router for export to handle middleware and routing
var router = express.Router();

// Saving Flight Data to DB//

router.post('/api/flightrecord', function(req, res) {
  // if (err) throw err;
  console.log(req.body);
db.flightrec.create(req.body)
.then(function(dbfr) {
  // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
// { new: true } tells the query that we want it to return the updated User -- it returns the original by default
// Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query

  return db.siteinfo.findOneAndUpdate({sitename:"alpha2"}, { $push: { flightdata: dbfr._id } }, { new: true });
})
.then(function(dbsite) {
      // If the User was updated successfully, send it back to the client
      res.json(dbsite +"record saved");
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});











//get all data from the mysql table
router.post('/api/flightdata', function(req, res) {

  //Since this in an uploaded file, sort by _id of upload
  flight.find(searchmon).sort({
    "_id": 1
  }).exec(function(err, results) {
    if (err) throw err;
    res.json(results)
    console.log(`${results.length}  files returned on query`)

  });

});

//Api test route//
//Route for getting ground winds
router.get('/api/flightdata/chart', function(req, res) {
  // db.query('SELECT GROUND_,TIME,Date,Winds_Aloft,TENSION FROM asitrep;',function(err,results){
  //   if(err) throw err;
  //   res.json(results);
  // })
});


// Route for getting date and time from table
router.get('/api/flightdata/data', function(req, res) {
  // db.query('SELECT Date, TIME FROM asitrep;',function(err,results){
  //   if(err) throw err;
  //   res.json(results);
  // })
});


// Route to grab data from client-side and add to mysql table.
router.post('/api/flightdata', function(req, res) {
  // db.query('INSERT INTO asitrep SET ?;', req.body,function(err,results){
  //   if(err) throw err;
  //   //// insert here command to add to Chart
  //   ////
  // })
  //   db.query('SELECT * FROM aisitrep;', function(req,res){
  //     res.json(res)
  //   })
});



/////////////////////// PAX TRACKER /////////////////////////////////////////////////////////

router.post('/api/pax', function(req, res) {
  db.query('INSERT INTO paxtracker SET ?', req.body, function(err, results) {
    if (err) throw err;
    console.log(req.body);
    //response to client side
    db.query('SELECT * FROM paxtracker', function(err, results) {
      if (err) throw err;
      res.json(results);
    })
  })
});


////show the whole roster////
router.get('/api/pax', function(req, res) {
  db.query('SELECT * FROM paxtracker', function(err, results) {
    if (err) throw err;
    res.json(results);
  })
})


/////////SITE ROUTES//////////////////

router.post('/api/site', (req, res) => {
  console.log(req.body.hub);
  console.log('***********************');
  console.log(req.body);
  // use site model to save to db
  db.siteinfo.create(req.body)
  // db.siteinfo.create({
  //   sitename: req.body.sitename,
  //   hub: req.body.hub,
  //   system: req.body.system,
  //   supportingunit: req.body.supportingunit
  // })
  // var Newlocationdb = req.body.sitename.toLowerCase().replace(/\s/g, '');
  // console.log("*******************")
  // //  //Created new DB in mongo for Site
  // var url = "mongodb://localhost:27017/PGSStestdb" ;
  //
  // mongoose.connect(url, (err, db) => {
  //   if (err) throw err;
  //   console.log("Database created for " + Newlocationdb + "!");
  //   newsite.save(function(err,siteinfo) {
  //     if (err) return console.error(err);
  //     console.log(siteinfo.sitename + " Site information to record")
  //     // mongoose.disconnect();
  //   })
  // If succeful return site saved to client
  .then(function() {
    res.json("site saved");
  }).catch(function(err){
    res.json(err);
  });

});

router.get('/api/sitelist',(req,res) =>{
  console.log(req.body);
  db.siteinfo.find({sitename:"alpha2"})
.then(function(site){
  res.json(site +"site exist");
})
.catch(function(err){
  res.json(err);
});
});


module.exports = router;
