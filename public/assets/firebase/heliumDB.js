/* global moment firebase */

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCzntWHt0eQrf8_T7sNXd7HDcmHmJQK-xM",
  authDomain: "realtime-d6489.firebaseapp.com",
  databaseURL: "https://realtime-d6489.firebaseio.com",
  projectId: "realtime-d6489",
  storageBucket: "realtime-d6489.appspot.com",
  messagingSenderId: "540451789449"
};
firebase.initializeApp(config);

// Initial Values
var groundWinds = [];
var windsAloft = [];
var flightAltitude = [];
var tetherTension = [];

//Save Helium Data info

function saveHeliumData() {

 event.preventDefault();

  var cont1 = $("#inputHContainer1").val().trim();
  var cont2 = $("#inputHContainer2").val().trim();
  var cont3 = $("#inputHContainer3").val().trim();
  var cont4 = $("#inputHExpended").val().trim();
  var inEx = $("#inputHExpended").val().trim();
  var loggedBy = $("#inputLoggedBy").val().trim();
  var note = $("#txtAreaNotes").val().trim();
  var inTLog = $("#inputTimeLogged").val().trim();

  var HeliumData = {
    HeliumContainer1: cont1,
    HeliumContainer2: cont2,
    HeliumContainer3: cont3,
    HeliumContainer4: cont4,
    HeliumExpended: inEx,
    LoggedBy: loggedBy,
    Notes: note,
    TimedLogged: inTLog,
    createDate: firebase.database.ServerValue.TIMESTAMP
  }

firebase.database().ref('Site/HeliumData/').push(HeliumData);
console.log("HeliumData Update Success");
}

//Retrieve one record for Helium Data info
firebase.database().ref('Site/HeliumData/').limitToLast(1).on('child_added', function(snapshot) {

  console.log(snapshot.val());

  // Store everything into a variable.
  var cont1 = snapshot.val().HeliumContainer1;
  var cont2 = snapshot.val().HeliumContainer2;
  var cont3 = snapshot.val().HeliumContainer3;
  var cont4 = snapshot.val().HeliumContainer4;
  var inEx = snapshot.val().HeliumExpended;
  var loggedBy = snapshot.val().LoggedBy;
  var note = snapshot.val().Notes;
  var inTLog = snapshot.val().TimedLogged;

  // Add each helium data into the table
  $("#helium-status-table > tbody").empty();
  $("#helium-status-table > tbody").append("<tr><td>" + inTLog + "</td><td>" + cont1 + "</td><td>" + cont2 + "</td><td>" +
  cont3 + "</td><td>" + cont4 + "</td><td>" + inEx + "</td></tr>");
      //SwapDivsWithClick('formId','heliumTableID');
});

/*flight Data queries*/
function saveFlightData() {

 event.preventDefault();

  var dateLogged = $("#Logged-By-Input").val().trim();
  var timeLogged = $("#Logged-By-Input").val().trim();
  var loggedBy = $("#Time-Logged-Input").val().trim();
  var system = 0;//$("#System-Input").val().trim();
  var systemStatus = $("#System-Status-Input").val().trim();
  var flightAltitude = $("#Flight-Altitude-Input").val().trim();
  var reasonMoored = $("#Reason-Moored-Input").val().trim();
  var Launches = $("#Launches-Input").val().trim();

  var recoveries = $("#Recoveries-Input").val().trim();
  var tetherTension = $("#Tether-Tension-Input").val().trim();
  var groundWinds = $("#Ground-Winds-Input").val().trim();
  var windsAloft = $("#Winds-Aloft-Input").val().trim();
  var groundTemp = $("#Ground-Temp-Input").val().trim();
  var barometricPressure = $("#Barometric-Pressure-Input").val().trim();
  var pitch = $("#Pitch-Input").val().trim();
  var heliumPressure = $("#Helium-Pressure-Input").val().trim();
  var ballonetPressure = $("#Ballonet-Pressure-Input").val().trim();
  var notes = $("#Notes").val().trim();

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
console.log("FlightData Update Success");
}

firebase.database().ref('Site/FlightData/').orderByChild("timeLogged")//dateLogged)
  .limitToFirst(6)
  .once('value')
  .then(function(records) {
  var recObj = records.val();
  $("#search-report-table > tbody").empty();
  for(var child in recObj){
    $("#flight-status-table> tbody").append("<tr><td>" + recObj[child].dateLogged + "</td><td>"+ recObj[child].loggedBy
     + "</td><td>" +recObj[child].timeLogged+ "</td><td>" +recObj[child].system+ "</td><td>"  + recObj[child].systemStatus + "</td><td>"
     + recObj[child].flightAltitude + "</td><td>" + recObj[child].reasonMoored + "</td><td>"
     + recObj[child].Launches + "</td><td>"+ recObj[child].recoveries+ "</td><td>" +recObj[child].tetherTension + "</td><td>" +recObj[child].groundWinds
     + "</td><td>"+recObj[child].windsAloft + "</td><td>"+recObj[child].groundTemp + "</td><td>"+ recObj[child].barometricPressure + "</td><td>"+recObj[child].pitch
     + "</td><td>"+recObj[child].heliumPressure + "</td><td>"+recObj[child].ballonetPressure + "</td><td>"+recObj[child].notes + "</td></tr>" );
  }
});

/* Charting Data**/
firebase.database().ref('Site/FlightData/').orderByChild('timeLogged')//dateLogged)
  .limitToLast(24)
  .once('value')
  .then(function(records) {
  var recObj = records.val();
  $("#flight-status-table > tbody").empty();
  for(var child in recObj){

      groundWinds.push(Number(recObj[child].groundWinds));
      windsAloft.push(Number(recObj[child].windsAloft));
      flightAltitude.push(Number(recObj[child].flightAltitude));
      tetherTension.push(Number(recObj[child].tetherTension));
      //console.log("groundWinds " + groundWinds);
  }
});



var ctx = document.getElementById("line-chart");
    console.log ("Bradshaw :" + ctx);
    console.log("groundWinds " + groundWinds);

    var lnChart = new Chart(ctx, {
        type: 'bar',
		        type: 'line',
		  data: {
		    labels: [0,4,8,12,16,20,24],
		    datasets: [{
		        data: groundWinds,
		        label: "Ground Wind Speed",
		        borderColor: "#3e95cd",
		        fill: false
		      }, {
		        data: flightAltitude,
		        label: "Airborne Wind Speed",
		        borderColor: "#8e5ea2",
		        fill: false
		      }, {
		        data: windsAloft,
		        label: "API ind Speed",
		        borderColor: "#3cba9f",
		        fill: false
		      }, {
		        data: tetherTension,
		        label: "Tether Tension",
		        borderColor: "#e8c3b9",
		        fill: false
		      }
		    ]
		  },
        options: {
          title: {
		      display: true,
		      text: 'Top Gun System Metrics'
		    },
        scales: {
                    xAxis: {
                         type: 'datetime',
                         dateTimeLabelFormats: {
                             day: '%b %H:%M:%S'
                         },
                         title: {
                             text: 'Time of day'
                         }
                    },
                    yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 5,
                                max: 100
                            }
                        }]
                }


		  }
    });
