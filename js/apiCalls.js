// Calls made to the API here

function getLatestGeoNews(input) {
  $.getJSON("//api.gdeltproject.org/api/v2/geo/geo?query=" + input + "&format=geoJSON&mode=pointdata&timespan=15", function (data) {
    displayData(data);
  })
}

function getNewsArticles(latlng) {
  $.getJSON("//api.gdeltproject.org/api/v2/geo/geo?query=" + inputString + "&format=geoJSON&mode=pointdata&timespan=15", function (data) {
    getNearest(data, latlng);
  })
}

function simulate24Hrs(input) {
  $.getJSON("//api.gdeltproject.org/api/v2/geo/geo?query=" + input + "&format=geoJSON&mode=pointanimation", function (data) {
    dataStream(data)
  })
}
