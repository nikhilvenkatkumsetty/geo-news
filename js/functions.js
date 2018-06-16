let heat, inputString;

function displayData(data) {
  let locationsArray = [];
  for (let i = 0; i < data.features.length; i++) {  //  LatLng reversed for use with leaflet
    locationsArray.push(reverseLatLng(
        data.features[i].geometry.coordinates[0],
        data.features[i].geometry.coordinates[1],
        data.features[i].properties.count))
  }
  generateCharts(data);  // Chart generated
  generateHeatMap(locationsArray);  // Heat map generated
}

function getNearest(data, latlng) {
  let closeArticles = [];
  console.log(latlng.lng, latlng.lat, data.features[0].geometry.coordinates[0], data.features[0].geometry.coordinates[1])
  for (let i = 0; i < data.features.length; i++) {
    let latDist = latlng.lat - data.features[i].geometry.coordinates[1];  // For speed, only latitude is checked first
    if (latDist < 5 && latDist > -5) {
      let lngDist = latlng.lng - data.features[i].geometry.coordinates[0];  // if latidude is close, longitude is then checked
      if (lngDist < 5 && lngDist > -5) {
        closeArticles.push(data.features[i])  // if both are within 5 clicks, the articles are displayed on the right panel
      }
    }
  }
  var txt = "";
  $("#table tr").remove();
  if (closeArticles.length > 0) {             // Simple jQuery emplyed to display result of nearest article
    for (let i = 0; i < closeArticles.length; i++) {
      let htmlParsed = closeArticles[i].properties.html.split("<br>")  // some parsing of result
      txt += "<tr><td><h5>" + htmlParsed[0] + "</h5><br>" +
          "<p id='left'>" + closeArticles[i].properties.name + "</p>" +
          "<p id='right'>" + "Hit Counts: " + closeArticles[i].properties.count + "</p></td></tr>"
    }
    if (txt != "") {
      $("#table").append(txt).removeClass("hidden");
      $("#tableCloseBtn").removeClass("hidden");
    }
  }
}

function dataStream(data) {
  let locationsArray = [];
  let date;
  let i = 0;
  function throttleDataStream() {
    setTimeout(function () {
      locationsArray.push(reverseLatLng(
          data.features[i].geometry.coordinates[0],
          data.features[i].geometry.coordinates[1],
          data.features[i].properties.count))
      date = data.features[i].properties.datetime.split("T") // parsing of date+time
      if (i % 50 == 0) {  // stream rate throttled here for browser performance
        $("#timeStamp").text(date[0] + " "  + date[1].slice(0, date[1].length - 1))
        generateHeatMap(locationsArray)
      }
      i++;
      if (i < data.features.length && stream == true) {
        throttleDataStream();
      }
    }, 30)
  }
  throttleDataStream();
}


function generateCharts(data) {
  let countryList = [];
  for (let i = 0; i < data.features.length; i++) {
    country = data.features[i].properties.name.split(",")
    let stringCountry = country[country.length-1].toString()
    if (stringCountry.charAt(0) == " ") {
      stringCountry = stringCountry.slice(1) // eliminating space at the beginning of string (some had some didn't)
    }
    countryList.push(stringCountry)
  }
  let occurrences = countryList.reduce(function(country, count) { // counting amount of articles per country
    country[count] = (country[count] || 0) + 1;
    return country;
  }, {});
  displayChart(occurrences) // display chart called (chart.js)
}
