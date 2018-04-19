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
/*
function curWeather() {
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
    });

  curWeather() ;*/
