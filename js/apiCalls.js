let heat, inputString, simulation;

function init(initval) {
  var input = document.getElementById("keyword").value
  inputString = input;
  if (initval == 1) {
    getLatestGeoNews(input)
  } else if (initval == 2) {
    simulate24hrs(input)
  }
}

function getLatestGeoNews(input) {
  $.getJSON("//api.gdeltproject.org/api/v2/geo/geo?query=" + input + "&format=geoJSON&mode=pointdata&timespan=15", function (data) {
    parseData(data);
  })
}

function getNewsArticles(latlng) {
  $.getJSON("//api.gdeltproject.org/api/v2/geo/geo?query=" + inputString + "&format=geoJSON&mode=pointdata&timespan=15", function (data) {
    console.log(data);
    getNearest(data, latlng);
  })
}

function simulate24hrs(input) {
  $.getJSON("//api.gdeltproject.org/api/v2/geo/geo?query=" + input + "&format=geoJSON&mode=pointanimation", function (data) {
    dataStream(data)
  })
}




