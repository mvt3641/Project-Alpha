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

//////////////////////////////////////* Charting Data**//////////////////////////////////
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

////////////////////////////Search Flight Data Reports//////////////////////////////////////////////////////////////////////



var flightData_ref= firebase.database().ref('Site/FlightData/');

///////////////////////////////////////////////////////search method  record///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var startDate=$("#Start-Date").val().trim();


// //input timed Logged
// //pull all items with that time logged
// //separate by time logg
$("#search").on("click", function(event){
  event.preventDefault();

 var startDate=$("#Start-Date").val().trim();
 var endDate=$("#End-Date").val().trim();
console.log(startDate);
search(startDate,endDate);



});

function search(start,end){

flightData_ref
  .orderByChild("dateLogged")//dateLogged)
 //.equalTo(start)
  .startAt(start)
  .endAt(end)
  .once('value')
  .then(function(records) {
  var recObj = records.val();
  console.log(recObj);
  $("#search-report-table > tbody").empty();

for(var child in recObj){
 // flightData_ref.on("child_added", function(records){
  $("#search-report-table > tbody").append("<tr><td>" + recObj[child].dateLogged + "</td><td>"+ recObj[child].loggedBy
  + "</td><td>" +recObj[child].timeLogged+ "</td><td>" +recObj[child].system+ "</td><td>"  + recObj[child].systemStatus + "</td><td>"
  + recObj[child].flightAltitude + "</td><td>" + recObj[child].reasonMoored + "</td><td>"
  + recObj[child].Launches + "</td><td>"+ recObj[child].recoveries+ "</td><td>" +recObj[child].tetherTension + "</td><td>" +recObj[child].groundWinds
  + "</td><td>"+recObj[child].windsAloft + "</td><td>"+recObj[child].groundTemp + "</td><td>"+ recObj[child].barometricPressure + "</td><td>"+recObj[child].pitch
  + "</td><td>"+recObj[child].heliumPressure + "</td><td>"+recObj[child].ballonetPressure + "</td><td>"+recObj[child].notes + "</td><td><button data-key="
  + recObj[child].key + ">Delete Record</button></td></tr>" );


}
});
//});
};





////////////////////////////////////////////////////////////////////////////////////////update and delete record/////////////////////////////////////////////////////////







$(document).on('click', '#search-report-table > tbody tr button', deleteRec);

function deleteRec() {
  var key = $(this).data('key');

  flightData_ref.child(key).remove();
  $(this).parents('tr').remove();
};






/////////////////////////////////////////////////////////////////////////Helium Firebase Status/////////////////////////////////////////
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
  $("#helium-status-table > tbody").append("<tr><td>" + inTLog + "</td><td>" + cont1 + "</td><td>" + cont2 + "</td><td>" +
  cont3 + "</td><td>" + cont4 + "</td><td>" + inEx + "</td></tr>");
      //SwapDivsWithClick('formId','heliumTableID');
});


//////////////////////////////////////Flight Status Window//////////////////////////////////////////////////////


flightData_ref.on("child_added", function(snap){
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
