//   // Initialize Firebase




//   // Initialize Firebase



 var flightData_ref= firebase.database().ref('Site/FlightData/')
  var dateLogged;
  var timeLogged ;
  var loggedBy;
  var system;
  var systemStatus;
  var flightAltitude;
  var reasonMoored;
  var launches ;
  var recoveries;
  var tetherTension;
  var groundWinds;
  var windsAloft ;
  var groundTemp;
  var barometricPressure;
  var pitch;
  var heliumPressure;
  var ballonetPressure;
  var flightAltitude;
  var reasonMoored;
  var Launches;
  var notes;
  $(".mooredButton").hide();
  $(".aloftButton").hide();

var y =0;
 if(y===23){
  y=0;
 }

var database =firebase.database();

$("#log").on("click", function(event){
  event.preventDefault();


   // dateLogged =$("#Date-Input").val().trim();
   // timeLogged =$("#Time-Logged-Input").val().trim();
   // loggedBy=$("#Logged-By-Input").val().trim();
   // systemStatus=$("#System-Status-Input").val().trim();
   // flightAltitude=$("#Flight-Altitude-Input").val().trim();
   // reasonMoored=$("#Reason-Moored-Input").val().trim();
   // Launches =$("#Launches-Input").val().trim();
   // recoveries=$("#Recoveries-Input").val().trim();
   // tetherTension=$("#Tether-Tension-Input").val().trim();
   // groundWinds=$("#Ground-Winds-Input").val().trim();
   // windsAloft =$("#Winds-Aloft-Input").val().trim();
   // groundTemp=$("#Ground-Temp-Input").val().trim();
   // barometricPressure=$("#Barometric-Pressure-Input").val().trim();
   // pitch =$("#Pitch-Input").val().trim();
   // heliumPressure=$("#Helium-Pressure-Input").val().trim();
   // ballonetPressure=$("#Ballonet-Pressure-Input").val().trim();
   // notes= $("#Notes").val().trim();


////datagenerator is a testing function//////////
dataGenerator();

  var FlightData={
   dateLogged: dateLogged,
   timeLogged: timeLogged,
   loggedBy:loggedBy,
   system:system,
   systemStatus:systemStatus,
   flightAltitude:flightAltitude,
   reasonMoored:reasonMoored,
   Launches:Launches,
   recoveries:recoveries,
   tetherTension:tetherTension,
   groundWinds:groundWinds,
   windsAloft:windsAloft,
   groundTemp:groundTemp,
   barometricPressure:barometricPressure,
   pitch:pitch,
   heliumPressure:heliumPressure,
   ballonetPressure:ballonetPressure,
   notes:notes
  };
  console.log(FlightData);

    firebase.database().ref('Site/FlightData/').push(FlightData);
   // firebase.database().ref('Site/HeliumData/').push(FlightData);

    //working forvariables for html
    loggedBy=$("#Logged-By-Input").val("");
    timeLogged =$("#Time-Logged-Input").val("");
    system=$("#System-Input").val("");
    systemStatus=$("#System-Status-Input").val("");
    flightAltitude=$("#Flight-Altitude-Input").val("");
    reasonMoored=$("#Reason-Moored-Input").val("");
    Launches =$("#Launches-Input").val("");
    recoveries=$("#Recoveries-Input").val("");
    tetherTension=$("#Tether-Tension-Input").val("");
    groundWinds=$("#Ground-Winds-Input").val("");
    windsAloft =$("#Winds-Aloft-Input").val("");
    groundTemp=$("#Ground-Temp-Input").val("");
    barometricPressure=$("#Barometric-Pressure-Input").val("");
    pitch =$("#Pitch-Input").val("");
    heliumPressure=$("#Helium-Pressure-Input").val("");
    ballonetPressure=$("#Ballonet-Pressure-Input").val("");
    notes= $("#Notes").val("");





});


flightData_ref.on("child_added", function(snap){

console.log(loggedBy);


////////////////////////////////////////////////////////////Current Status Table////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#report-table> tbody").html("<tr><td>" + snap.val().dateLogged + "</td><td>"+ snap.val().loggedBy
  + "</td><td>" +snap.val().timeLogged+ "</td><td>" +snap.val().system + "</td><td>" + snap.val().systemStatus + "</td><td>"
  + snap.val().flightAltitude + "</td><td>" + snap.val().reasonMoored + "</td><td>"
  + snap.val().Launches + "</td><td>"+ snap.val().recoveries+ "</td><td>" +snap.val().tetherTension + "</td><td>" +snap.val().groundWinds
  + "</td><td>"+snap.val().windsAloft + "</td><td>"+snap.val().groundTemp + "</td><td>"+snap.val().barometricPressure + "</td><td>"+snap.val().pitch
  + "</td><td>"+snap.val().heliumPressure + "</td><td>"+snap.val().ballonetPressure + "</td><td>"+snap.val().notes + "</td></tr>" );

var update=$("<button>").attr("class","update");
//////////////////////////////////////////////////////////////////Full Day Table//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$("#full-report-table > tbody").append("<tr><td>" + snap.val().dateLogged + "</td><td>"+ snap.val().loggedBy
  + "</td><td>" +snap.val().timeLogged+ "</td><td>" +snap.val().system+ "</td><td>"  + snap.val().systemStatus + "</td><td>"
  + snap.val().flightAltitude + "</td><td>" + snap.val().reasonMoored + "</td><td>"
  + snap.val().Launches + "</td><td>"+ snap.val().recoveries+ "</td><td>" +snap.val().tetherTension + "</td><td>" +snap.val().groundWinds
  + "</td><td>"+snap.val().windsAloft + "</td><td>"+snap.val().groundTemp + "</td><td>"+snap.val().barometricPressure + "</td><td>"+snap.val().pitch
  + "</td><td>"+snap.val().heliumPressure + "</td><td>"+snap.val().ballonetPressure + "</td><td>"+snap.val().notes + "</td></tr>" );


///////////////////////////////////////////////////////////display on dashboard aloft vs. moored//////////////////////////////////////////////////////////////////
      if(snap.val().system==="Moored"){

      console.log("if/else :moored")
        $("#atlanta-Site").empty();
          $(".aloftButton").hide();
          $(".mooredButton").show();
          $("#displayStatus").text(snap.val().systemStatus);
          $("#displayReason").text(snap.val().reasonMoored);


      }
      else{
          $("#atlanta-Site").empty();
          $(".mooredButton").hide();
           $(".aloftButton").show();
            $("#displayStatus").text(snap.val().systemStatus);
            $("#displayReason").text(snap.val().reasonMoored);
      }
})








///////////////////////////////////////////////////////////////////////testing zone ////////////////////////////////////////////////////////////////////////////////////
function dataGenerator(){
     dateLogged=dateGen();
     loggedBy=nameGen();
    timeLogged =timeGen();

    sysStat();
    Launches =Math.floor(Math.random() *85) ;
    recoveries=Math.floor(Math.random() *85) ;
    tetherTension=Math.floor(Math.random() *85) ;
    groundWinds=Math.floor(Math.random() *85) ;
    windsAloft =Math.floor(Math.random() *85) ;
    groundTemp=Math.floor(Math.random() *85) ;
    barometricPressure=Math.floor(Math.random() *85) ;
    pitch =Math.floor(Math.random() *85) ;
    heliumPressure=Math.floor(Math.random() *85) ;
    ballonetPressure=Math.floor(Math.random() *85) ;
    notes= Math.floor(Math.random() *85) ;



//random name generator

function nameGen(){
    loggedBy=randomEl(adjectives)+' '+randomEl(nouns);

function randomEl(list) {
    var i = Math.floor(Math.random() *85) ;//list.length);
    console.log(list[i])

    return list[i];
}


return loggedBy;
}

function timeGen(){


  timeLogged=randomMilitaryTime(militaryTime);

  console.log("y= " + y)
 y++;
  return timeLogged;


 function randomMilitaryTime(list){
    //Math.floor(Math.random() *24) ;
    console.log(list[y]);
      return list[y];
}
}

 function dateGen(){
      var month=Math.floor(Math.random() *11)+1;
      var day=Math.floor(Math.random() *31);
      var year=Math.floor(Math.random() *10)+8;
      var date= month+'/'+day+'/'+year;
      var strDate=String(date);
      return strDate;
 }


 function sysStat(){
   var day=Math.floor(Math.random() *2);
   var alt=Math.floor(Math.random() *13000)+19000;
   //var stat=
    if(day==0){
      flightAltitude=0;
      system ="Moored";
      systemStatus=sysStatGen(systemStatusArr);
      reasonMoored=reasonGen(reason);
    //  return systemStatus;
      } else{
        system="Aloft";
        systemStatus=sysStatGen(systemStatusArr);
        flightAltitude= alt;
        reasonMoored="N/A";
      //  return  flightAltitude;
      }



 }
 function sysStatGen(list){
    var s=Math.floor(Math.random() *3);
        systemStatus=list[s];
        return systemStatus
 }
 function reasonGen(list){
    var r =Math.floor(Math.random() *4);
    reasonMoored=list[r];
    return reasonMoored
 }


console.log("Data gen working : name: " + loggedBy + systemStatus);
}

var adjectives = ["adamant", "adroit", "amatory", "animistic", "antic", "arcadian", "baleful", "bellicose", "bilious", "boorish", "calamitous", "caustic", "cerulean", "comely", "concomitant", "contumacious", "corpulent", "crapulous", "defamatory", "didactic", "dilatory", "dowdy", "efficacious", "effulgent", "egregious", "endemic", "equanimous", "execrable", "fastidious", "feckless", "fecund", "friable", "fulsome", "garrulous", "guileless", "gustatory", "heuristic", "histrionic", "hubristic", "incendiary", "insidious", "insolent", "intransigent", "inveterate", "invidious", "irksome", "jejune", "jocular", "judicious", "lachrymose", "limpid", "loquacious", "luminous", "mannered", "mendacious", "meretricious", "minatory", "mordant", "munificent", "nefarious", "noxious", "obtuse", "parsimonious", "pendulous", "pernicious", "pervasive", "petulant", "platitudinous", "precipitate", "propitious", "puckish", "querulous", "quiescent", "rebarbative", "recalcitant", "redolent", "rhadamanthine", "risible", "ruminative", "sagacious", "salubrious", "sartorial", "sclerotic", "serpentine", "spasmodic", "strident", "taciturn", "tenacious", "tremulous", "trenchant", "turbulent", "turgid", "ubiquitous", "uxorious", "verdant", "voluble", "voracious", "wheedling", "withering", "zealous"];
var nouns = ["ninja", "chair", "pancake", "statue", "unicorn", "rainbows", "laser", "senor", "bunny", "captain", "nibblets", "cupcake", "carrot", "gnomes", "glitter", "potato", "salad", "toejam", "curtains", "beets", "toilet", "exorcism", "stick figures", "mermaid eggs", "sea barnacles", "dragons", "jellybeans", "snakes", "dolls", "bushes", "cookies", "apples", "ice cream", "ukulele", "kazoo", "banjo", "opera singer", "circus", "trampoline", "carousel", "carnival", "locomotive", "hot air balloon", "praying mantis", "animator", "artisan", "artist", "colorist", "inker", "coppersmith", "director", "designer", "flatter", "stylist", "leadman", "limner", "make-up artist", "model", "musician", "penciller", "producer", "scenographer", "set decorator", "silversmith", "teacher", "auto mechanic", "beader", "bobbin boy", "clerk of the chapel", "filling station attendant", "foreman", "maintenance engineering", "mechanic", "miller", "moldmaker", "panel beater", "patternmaker", "plant operator", "plumber", "sawfiler", "shop foreman", "soaper", "stationary engineer", "wheelwright", "woodworkers"];
var militaryTime=["0000",'0100','0200','0300','0400', '0500', '0600', '0700', '0800', '0900',"1000","1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100","2200", "2300"];
var systemStatusArr=["FMC", "NMC", "PMC"];
var reason=["WX","SM","UM","BD"] ;
///////////////////////////////////////////////end of testing zone//////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////search method  record///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var startDate=$("#Start-Date").val().trim();



$("#search").on("click", function(event){
  event.preventDefault();

 var startDate=$("#Start-Date").val().trim();

search(startDate);



});



function search(start){

flightData_ref
  .orderByChild("dateLogged")
 .equalTo(start)

  .once('value')
  .then(function(records) {
  var recObj = records.val();
  console.log("Key: " + records.key)
  console.log(recObj);
  $("#search-report-table > tbody").empty();

for(var child in recObj){
 //flightData_ref.on("child_added", function(records){
 	console.log("this is the child key: " +child);
  $("#dt1 > tbody").append("<tr data-key="+ child+ "><td>" + recObj[child].dateLogged + "</td><td>"+ recObj[child].loggedBy
  + "</td><td>" +recObj[child].timeLogged+ "</td><td>" +recObj[child].system+ "</td><td>"  + recObj[child].systemStatus + "</td><td>"
  + recObj[child].flightAltitude + "</td><td>" + recObj[child].reasonMoored + "</td><td>"
  + recObj[child].Launches + "</td><td>"+ recObj[child].recoveries+ "</td><td>" +recObj[child].tetherTension + "</td><td>" +recObj[child].groundWinds
  + "</td><td>"+recObj[child].windsAloft + "</td><td>"+recObj[child].groundTemp + "</td><td>"+ recObj[child].barometricPressure + "</td><td>"+recObj[child].pitch
  + "</td><td>"+recObj[child].heliumPressure + "</td><td>"+recObj[child].ballonetPressure + "</td><td>"+recObj[child].notes + "</td><td><button id='upDateRec' data-toggle='modal' data-target='#exampleModal' data-key="
  + child + ">Update Record</button></td></tr>" );


}

})
};





/////////////////////////////////////////////////////////////////////////////////update a record///////////////////////////////////////////////////////////////////////////////////
var key;
$(document).on('click', "#upDateRec", function(){
	console.log("test");
	key = $(this).parents('tr').data('key');
	console.log("upate button" + key);

});

$("#saveModal").on("click", function(){

   dateLogged =$("#Date-Input").val().trim();
   timeLogged =$("#Time-Logged-Input").val().trim();
   loggedBy=$("#Logged-By-Input").val().trim();
   systemStatus=$("#System-Status-Input").val().trim();
   flightAltitude=$("#Flight-Altitude-Input").val().trim();
   reasonMoored=$("#Reason-Moored-Input").val().trim();
   Launches =$("#Launches-Input").val().trim();
   recoveries=$("#Recoveries-Input").val().trim();
   tetherTension=$("#Tether-Tension-Input").val().trim();
   groundWinds=$("#Ground-Winds-Input").val().trim();
   windsAloft =$("#Winds-Aloft-Input").val().trim();
   groundTemp=$("#Ground-Temp-Input").val().trim();
   barometricPressure=$("#Barometric-Pressure-Input").val().trim();
   pitch =$("#Pitch-Input").val().trim();
   heliumPressure=$("#Helium-Pressure-Input").val().trim();
   ballonetPressure=$("#Ballonet-Pressure-Input").val().trim();
   notes= $("#Notes").val().trim();



	console.log(dateLogged)

	console.log(key);


	   flightData_ref.child(key).set({
	   dateLogged: dateLogged,
	   timeLogged: timeLogged,
	   loggedBy:loggedBy,
	 //  system:system,
	   systemStatus:systemStatus,
	   flightAltitude:flightAltitude,
	   reasonMoored:reasonMoored,
	   Launches:Launches,
	   recoveries:recoveries,
	   tetherTension:tetherTension,
	   groundWinds:groundWinds,
	   windsAloft:windsAloft,
	   groundTemp:groundTemp,
	   barometricPressure:barometricPressure,
	   pitch:pitch,
	   heliumPressure:heliumPressure,
	   ballonetPressure:ballonetPressure,
	   notes:notes
	});



search(dateLogged);
	});


// var fb = new Firebase("https://examples-sql-queries.firebaseio.com/");
// fb.child('user/123').once('value', function(userSnap) {
//    fb.child('media/123').once('value', function(mediaSnap) {
//        // extend function: https://gist.github.com/katowulf/6598238
//        console.log( extend({}, userSnap.val(), mediaSnap.val()) );
//    });
// });

// function extend(base) {
//     var parts = Array.prototype.slice.call(arguments, 1);
//     parts.forEach(function (p) {
//         if (p && typeof (p) === 'object') {
//             for (var k in p) {
//                 if (p.hasOwnProperty(k)) {
//                     base[k] = p[k];
//                 }
//             }
//         }
//     });
//     return base;
//}

///////////////////////////////////////////////////////////////////////////////////////////////Weather API///////////////////////////////////////////////////////////////////////////////////





var appID = "eb7acd14dcfc608e19796902cddb4326";

      $(".query_btn").click(function() {

        var query_param = $(this).prev().val();


        if ($(this).prev().attr("placeholder") == "Current Weather") {
          var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&APPID=" + appID;

          $.getJSON(weather, function(json) {


            $("#city").html(json.name);
            $("#main_weather").html(json.weather[0].main);
            $("#description_weather").html(json.weather[0].description);
            $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
            //Temp coversion//
            function tempconvert() {
              var tempmath = (((json.main.temp - 273.15) * 1.8) + 32);
              return tempmath.toFixed(2);
            };

            $("#temperature").html(tempconvert() + "F");
            $("#pressure").html(json.main.pressure + "mb/hPa");
            $("#humidity").html(json.main.humidity + "%");
            //Wind knots Convert//
            function windconvert() {
              var windmath = ((json.wind.speed) * 1.9438445);
              return windmath.toFixed(2);
            };
            $("#wind").html(windconvert() + "Knts Deg: " + (json.wind.deg));

            console.log(json);
          });

        }

      })



///////////////////////////////////////////////////////////////////////////////////////////////join ///////////////////////////////////////////////////////////////////////////////////

var groundWinds = [];
var windsAloft = [];
var flightAltitude = [];
var tetherTension = [];

firebase.database().ref('Site/FlightData/').orderByChild("dateLogged")//dateLogged)
  .limitToLast(24)
  .once('value')
  .then(function(records) {
  var recObj = records.val();
  $("#search-report-table > tbody").empty();
  for(var child in recObj){
    console.log("groundWinds " + parseInt(recObj[child].groundWinds));
    groundWinds.push(Number(recObj[child].groundWinds));
   windsAloft.push(Number(recObj[child].windsAloft));
   flightAltitude.push(Number(recObj[child].flightAltitude));
   tetherTension.push(Number(recObj[child].tetherTension));
  }
});

new Chart(document.getElementById("line-chart"), {
type: 'line',
data: {
  labels: ["January","Feburary","March","April","May","June","July","August","September","October","November","December"],
  datasets: [{
      data: [86,114,106,106,107,111,133,221,783,2478],
      label: "Scheduled Maintenance",
      borderColor: "#3e95cd",
      fill: false
    }, {
      data: [282,350,411,502,635,809,947,1402,3700,5267],
      label: "Aloft",
      borderColor: "#8e5ea2",
      fill: false
    }, {
      data: [168,170,178,190,203,276,408,547,675,734],
      label: "Battle Damage",
      borderColor: "#3cba9f",
      fill: false
    }, {
      data: [40,20,10,16,24,38,74,167,508,784],
      label: "Weather",
      borderColor: "#e8c3b9",
      fill: false
    }, {
      data: [6,3,2,2,7,26,82,172,312,433],
      label: "Moored",
      borderColor: "#c45850",
      fill: false
    }
  ]
},
options: {
  title: {
    display: true,
    text: 'Site Operational Graph'
  }
}
});
