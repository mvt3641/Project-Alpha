//////////load charts////////////////////////////////////
$(document).ready(function() {
  $.ajax({
    method: 'POST',
    url: '/flightdata',
    data: {
      // month: monthctns
    },
    // contentType: 'application/json',
    // dataType: 'json'
  })
  .then(function(res) {
    console.log(res);
     // Build working graphs
    // dtgraph(res);
    // pieChartgraph(res);
    // graphChart(res)
    // Ao(res)
  })
});



function SwapDivsWithClick(div1,div2) {
  console.log(" divvals" + div1 +" " + div2);
   d1 = document.getElementById(div1);
   d2 = document.getElementById(div2);
   if( d2.style.display == "none" )
   {
      d1.style.display = "none";
      d2.style.display = "block";
   }
   else
   {
      d1.style.display = "block";
      d2.style.display = "none";
   }
}

function saveFlightData() {

 event.preventDefault();

  var dateLogged = $("#dateLogged").val().trim();
  var User = $("#userLogged").val().trim();
  var Time = $("#TimeLogged").val().trim();
  var system = $("#aerostatSN").val().trim();
  var systemStatus = $("#System-Status").val().trim();
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
   User: User,
   Time: Time,
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


$.ajax({
  type:'POST',
  url:'/api/flightrecord',
  data: JSON.stringify(FlightData),
  contentType: 'application/json',
  dataType: 'json'
})
.then(function(res) {
  console.log(res);
})
};

// firebase.database().ref('Site/FlightData/').push(FlightData);
// console.log("FlightData Update Success");
// }
