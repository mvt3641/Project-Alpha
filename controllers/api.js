//requiring express for routing and server services
var express = require('express');
var mongoose = require('mongoose');
// Import models
var flight = require("../models/flightmodel");
var flightrec = require('../models/flightrecmodel');
//var ----- = require('../models/ ex.flightmodel')
//requring the mongodb database connection
var db = require('../config/connection');
mongoose.Promise = Promise;
//creating a router for export to handle middleware and routing
var router = express.Router();

// Saving Flight Data to DB//

router.post('/api/flightrecord', function(req, res) {
  // if (err) throw err;
  console.log(req.body);

  var url = "mongodb://localhost:27017/flightdatatest";

  var flightlog = new flightrec(req.body);
  mongoose.connect(url, (err, db) => {
    if (err) throw err;
    console.log("hour logged " + req.body.Time + "!");
    flightlog.save(function(err, flightrec) {
      if (err) return console.error(err);
      console.log(flightrec.Time + " hourly log saved")
      // mongoose.disconnect();
    })
  })

  res.json("record saved");
});




//////////////////////get all data from the db to the charts
router.post('/flightdata', function(req, res) {
  var url = "mongodb://localhost:27017/flightdatatest";
  mongoose.connect(url, (err, db) => {
    //Since this in an uploaded file, sort by _id of upload
    flight.find().sort({
      "_id": 1
    })
    .exec(function(err, results) {
      if (err) throw err;
      res.json(results)
      console.log(`${results.length}  files returned on query`)
    })
    })
   });

//////////////////////////////////////////////////////////////////////////////////////
///////////////////Test route for notes//////////////////////////////////////////////
router.post('/flightdatanotes', function(req, res){
  var url = "mongodb://localhost:27017/flightdatatest";
  mongoose.connect(url, (err, db) =>{
    flightrec.find()
    .exec(function(err, results) {
      if (err) throw err;
      res.json(results)
      console.log(`${results.length}  files returned on query for notes`)
    })
  })

})

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

/////////SITE ROUTE//////////////////

router.post('/api/site', function(req, res) {
  db.query('INSERT INTO location SET ?', req.body, function(err, results) {
    if (err) throw err;
    console.log(req.body);
    //response to client side
    db.query('SELECT * FROM location', function(err, results) {
      if (err) throw err;
      res.json(results);
    })
  })
});


router.get('/api/site', function(req, res) {
  db.query('SELECT * FROM location', function(err, results) {
    if (err) throw err;
    res.json(results);
  })
});



module.exports = router;
