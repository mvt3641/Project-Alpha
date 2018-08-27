$(document).ready(function() {
  console.log("live and loaded");
  var appID = "eb7acd14dcfc608e19796902cddb4326";

  $(".query_btn").click(function() {
    $("#forecastWin").html("");

    var query_param = $(this).prev().val();


    // $(this).prev().attr("placeholder") == "Current Weather") {
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
      })

  .then(function() {

    // } else if ($(this).prev().attr("placeholder") == "Location Forecast") {
    var weather = "http://api.openweathermap.org/data/2.5/forecast?q=" + query_param + "&APPID=" + appID;
    // var weather = "http://api.openweathermap.org/data/2.5/forecast?q=" + "Atlanta" + "&APPID=" + appID;

    $.getJSON(weather, function(json) {
      var timeArr = [];
      var WindArr = [];
      for (var i = 0; i < json.list.length; i++) {
        var FC = $("<div id='Newforecast'>")
        var City = json.city.name;
        var Time = json.list[i].dt_txt;
        var Temp = (((json.list[0].main.temp - 273.15) * 1.8) + 32).toFixed(2);
        var Wind = ((json.list[i].wind.speed) * 1.9438445).toFixed(2);
        var mainDesc = json.list[i].weather[0].main;


        FC.append("City: " + City + "  Time(GMT): " + Time + "  Temperature: " + Temp + "  Wind: " + Wind + "  Description: " + mainDesc);
        $("#forecastWin").prepend(FC);
        //console.log(json);
        console.log(Time);
        console.log(Wind);
        // var timeArr =[];
        // var WindArr =[];
        timeArr.push(Time);
        WindArr.push(Wind);

      };
      //console.log(json.list)

      ///////////////////////////// chart.js testing//////////////////////////////////////////////////////////////////////////////////////////////

      var ctx = document.getElementById('myChart').getContext('2d');
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
        labels: timeArr,
          datasets: [{
            label: "5 day Ground Wind Forecast",
            //backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(70,90,172)',
            data: WindArr,
            pointRadius: 4,
          }]
        },

        // Configuration options go here
        options:{ maintainAspectRatio: false,
          scales: {
         xAxes: [{
             ticks: {
                 fontSize: 1
             }
         }]
     }
        }
      });


    })
  })

});

})


// })
