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
    dtgraph(res);
    pieChartgraph(res);
    graphChart(res)
    flightlog(res);
    // Ao(res)
  });
  //////Call notes/////////////////
  $.ajax({
      method: 'POST',
      url: '/flightdatanotes',
      data: {},
  }).then(function(res){
    notestables(res);
 // for( var i=0;i<res.length;i++){
 //  var p= $('<p>').text(res[i].notes);
 //      $("#notes_table").append(p);
      console.log(res);
 //    }
  })
///////////////////////////////////////
});

function notestables(res){
  for (var i=0;i<res.length;i++){
   var p= $('<p> <hr>').text(res[i].notes);
   // var hr= $('hr');
       $("#notes_table").append(p);
     }
}

function flightlog(res){
  for (var i=0;i<res.length;i++){
    var row = $("<tr>");
    // var data = $('<td>').text(Object.values(res[i]));
    var data = Object.values(res[i]);
    data.split(",");
    row.append(data);
    $("#flightlogtb").append(row);
    console.log("DATA "+ data);
  }
}


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
   ground_Winds:groundWinds,
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


////Functions for graphs
//Graphing chart for winds speed
function graphChart(res) {
  var tnArr = [];
  var grdArr = [];
  var timeArr = [];
  var windArr = [];
  for (var i = 0; i < 48; i++) {
    //console.log(res[i].GROUND_);
    //console.log(res[i].TIME);
    var winds = res[i].windsAloft;
    var date = res[i].date;
    var grd = res[i].groundWinds;
    var time = res[i].time + " " + date;
    var tension = res[i].tension;
    // var grdArr =[];
    // var timeArr =[];
    grdArr.push(grd);
    timeArr.push(time);
    windArr.push(winds);
    tnArr.push(tension);
    // console.log(grdArr);
    // console.log(timeArr);
    //console.log(date);

    // Moved chart out of scope
    var ctx = document.getElementById('windChart').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for the dataset
      data: {
        labels: timeArr,
        datasets: [{
            label: "Ground Wind Chart",
            backgroundColor: 'rgb(47,160,110)',
            borderColor: 'rgb(70,90,172)',
            data: grdArr,
          },
          {
            label: "Winds Aloft",
            backgroundColor: "#999",
            borderColor: "skyblue",
            data: windArr,
          }
        ]
      },

      // Configuration options go here
      options: {
         maintainAspectRatio: false,
         responsive: false,
      }
    });

  }
};


//Chart for graphing hours aloft
function pieChartgraph(res) {
  var Aloftcnt = 0;
  var mooredcnt = 0;
  var combArr = [];
  for (var i = 0; i < res.length; i++) {
    if (res[i].flight_ST < 1) {
      mooredcnt++;
    }
    if (res[i].flight_ST > 0) {
      Aloftcnt++;
    }
  };
  combArr.push(mooredcnt, Aloftcnt);
  $("#operation").text("Moored hrs: "+mooredcnt+"  Aloft hrs: "+Aloftcnt)

  new Chart(document.getElementById("barChart"), {
    type: 'pie',
    data: {
      labels: ["Moored", "Aloft"],
      datasets: [{
        label: "Hours per month",
        backgroundColor: ["#3e95cd", "#8e5ea2"],
        data: combArr
      }]
    },
    options: { maintainAspectRatio: false,
      responsive: false,
      legend: {
        display: true
      },
      title: {
        display: true,
        text: "Flight time breakdown by month"
      }
    }
  });



};

function dtgraph(res) {
  var wxCount = 0;
  var smCount = 0;
  var umCount = 0;
  var bdCount = 0;
  var Aloft = 0;
  var combArr = [];
  for (var i = 0; i < res.length; i++) {
    switch (res[i].reason) {
      case 'WX':
        wxCount++;
        break;
      case 'SM':
        smCount++;
        break;
      case 'UM':
        umCount++;
        break;
      case 'BD':
        bdCount++;
      default:
        Aloft++;

    }
  }
  combArr.push(wxCount, smCount, umCount, bdCount, Aloft);
  console.log(combArr);
  $("#flightBrkdwn").text("Weather: "+wxCount+"\n"+" Scheduled Maintenance: "+smCount+"\n"+" Unscheduled Maintenance: "+umCount+"\n"+" Battle Damage: "+bdCount+"\n"+" Aloft: "+Aloft);

  new Chart(document.getElementById("RadarChart"), {
    type: 'radar',
    data: {
      labels: ["Weather", "Scheduled Maintenance", "Unscheduled Maintenence", "Battle Damage", 'Aloft'],
      datasets: [{
        label: "Recored flight Status or Reason Moored",
        fill: true,
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(179,181,198,1)",
        data: combArr
      }]
    },
    options: { maintainAspectRatio: false,
      responsive: false,
      scale: {
            ticks: {
              backdropColor: 'grey'
            }
        },
      title: {
        display: true,
        text: 'Flight Status'
      }
    }
  });


};
