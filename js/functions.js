let heat, inputString;

function displayData(data) {
  let locationsArray = [];
  for (let i = 0; i < data.features.length; i++) {
    locationsArray.push(reverseLatLng(
        data.features[i].geometry.coordinates[0],
        data.features[i].geometry.coordinates[1],
        data.features[i].properties.count))
  }
  generateHeatMap(locationsArray)
}


function getNearest(data, latlng) {
  let closeArticles = [];
  console.log(latlng.lng, latlng.lat, data.features[0].geometry.coordinates[0], data.features[0].geometry.coordinates[1])
  for (let i = 0; i < data.features.length; i++) {
    let latDist = latlng.lat - data.features[i].geometry.coordinates[1];
    if (latDist < 5 && latDist > -5) {
      let lngDist = latlng.lng - data.features[i].geometry.coordinates[0];
      if (lngDist < 5 && lngDist > -5) {
        closeArticles.push(data.features[i])
      }
    }
  }
  let txt = "";
  $("#table tr").remove();
  if (closeArticles.length > 0) {
    txt += "<tr><th>" + "Country" + "</th><th>" + "Link" + "</th></tr>"
    for (let i = 0; i < closeArticles.length; i++) {
      let htmlParsed = closeArticles[i].properties.html.split("<br>")
      txt += "<tr><td>" + closeArticles[i].properties.name + "</td><td>" + htmlParsed[0] + "</td></tr>"
    }
    if (txt != "") {
      $("#table").append(txt).removeClass("hidden");
    }
  }
}


function dataStream(data) {
  let locationsArray = [];
  let i = 0;
  function throttleDataStream() {
    setTimeout(function () {
      locationsArray.push(reverseLatLng(
          data.features[i].geometry.coordinates[0],
          data.features[i].geometry.coordinates[1],
          data.features[i].properties.count))
      if (i % 50 == 0) {
        generateHeatMap(locationsArray)
      }
      i++;
      if (i < data.features.length) {
        throttleDataStream();
      }
    }, 30)
  }
  throttleDataStream();
}