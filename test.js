var Nightmare = require("nightmare");

var nightmare = new Nightmare({ show: true,typeInterval: 100
 });

 var flightStatus = ["FMC","PMC","NMC"];

 var reasonMoored = ["WX","SM","UM","BD","Aloft"];

 var names = ['Woody','Leo','Gunner','Nick','Crawley','Sergi'];

 var notesArray = ["Launched Aerostat","Performed maintenance on platform","Inflated to 7MC", "Moored for Weather", "Patched Aerostat", "Launching at 0700"]



 function random(max) {
 return Math.floor(Math.random() * Math.floor(max));
}

function getRnd(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function randomarr(array){
   let rand= Math.floor(Math.random() * array.length -1)
  return array[rand];
}

var rdmstatus = Math.floor(Math.random()*flightStatus.length);
var rdmmooring = Math.floor(Math.random()*reasonMoored.length);
var rdmnotes = Math.floor(Math.random()*notesArray.length);
//randomnames(names);



nightmare
  .goto("http://localhost:3600")
  .type("#exampleInputEmail3","test@gmail.com")
  .type("#exampleInputPassword3", "testtest")
  .click("#login")
  .wait(2000)
  .click("#FlightTab")
  .wait(6000)
  .click("#addlog")
  .type("#dateLogged","2018-12-"+random(20))
  .type("#userLogged", randomarr(names))
  .type("#TimeLogged",getRnd(1,12))
  .type("#aerostatSN", "Site 1")
  .evaluate(function(selector, value) {
   jQuery(selector).val(value);
}, '#System-Status', flightStatus[rdmstatus])
   .type("#Flight-Altitude-Input", getRnd(1500,2000))
   .evaluate(function(selector, value) {
    jQuery(selector).val(value);
 }, '#Reason-Moored-Input', reasonMoored[rdmmooring])
   .type("#Launches-Input", getRnd(1,2))
   .type("#Recoveries-Input", getRnd(1,2))
   .type("#Tether-Tension-Input", getRnd(750,1100))
   .type("#Ground-Winds-Input", getRnd(8,20))
   .type("#Winds-Aloft-Input", getRnd(8,20))
   .type('#Notes', notesArray[rdmnotes])
   .click('#saved')
   .click("#metricsTab")
   .click("#operationsPage")
  .then(function(res) {
    console.log("Confirmed");
  })
  .catch(function(error) {
    console.error("Search failed:", error);
  });
