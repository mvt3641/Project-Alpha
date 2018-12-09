var Nightmare = require("nightmare");

var nightmare = new Nightmare({ show: true,typeInterval: 200
 });

 function random(max) {
 return Math.floor(Math.random() * Math.floor(max));
}

function getRnd(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}


var names = ['Woody','Leo','Gunner','Nick','Crawley','Sergi'];

function randomnames(array){
   let randName= Math.floor(Math.random() * array.length -1)
  return array[randName];
}

//randomnames(names);


nightmare
  .goto("http://localhost:3600")
  .type("#exampleInputEmail3","test@gmail.com")
  .type("#exampleInputPassword3", "testtest")
  .click("#login")
  .click(href="flightTab")
  // .click("#flightTab")
  .wait(6000)
  .click("#addlog")
  .type("#dateLogged","2018-12-"+random(20))
  .type("#userLogged", randomnames(names))
  .type("#TimeLogged","500")
  .type("aerostatSN", "Site 1")
  .evaluate(function(selector, value) {
   jQuery(selector).val(value);
}, '#System-Status', random())
   .type("#Flight-Altitude-Input", random(1500,2000))
   .evaluate(function(selector, value) {
    jQuery(selector).val(value);
 }, '#Reason-Moored-Input', random())
   .type("#Launches-Input", random(1,2))
   .type("#Recoveries-Input", random(1,2))
   .type("#Tether-Tension-input", random(750,1100))
   .type("#Ground-Winds-Input", random(8,20))
   .type("#Winds-Aloft-Input", random(8,20))
   .type('#Notes', "Name the automation")
   .click('#saved')
   .click("#metricsTab")
   .goto("operationUI.html")
  .then(function(res) {
    console.log("Confirmed");
  })
  .catch(function(error) {
    console.error("Search failed:", error);
  });
