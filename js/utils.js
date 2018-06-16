// Basic utility functions

let stream = false;

function init(initval) {
  var input = document.getElementById("keyword").value
  inputString = input;
  if (initval == 1) {
    getLatestGeoNews(input)  // Standart search
    $("#chartButton").removeClass("hidden");
  } else if (initval == 2) {
    if (stream == false) {  // Stream (start and stop button)
      stream = true;
      simulate24Hrs(input);
      $('#simulateButton').text("Stop Simulation").removeClass("simulateBlue").addClass("simulateRed");
      $("#timeStamp").removeClass("hidden");
    } else if (stream == true) {
      stream = false;
      clearAll();
      $('#simulateButton').text("Start Simulation").removeClass("simulateRed").addClass("simulateBlue");
    }
  }
}

function reverseLatLng(lat, lng, count) { // reverse latlng function used numerous times
  let reversedLatLng = [
    lng,
    lat,
    count
  ]
  return reversedLatLng
}

function generateHeatMap(latlng) { // generate heat map used numerous times
  if (map.hasLayer(heat) == true) {
    console.log("clearing previous heatmap") // clears previous heatmap for browser performance improvement
    map.removeLayer(heat)
  }
  heat = L.heatLayer(latlng, {radius: 15});
  map.addLayer(heat);
}

function closeTable() {                // standard jQuery functions here
  $("#table").addClass("hidden");
  $("#tableCloseBtn").addClass("hidden");
}

function closeData() {
  $("#dataContainer").addClass("hidden");
  $("#dataCloseButton").addClass("hidden");
}

function showCharts() {
  $("#dataContainer").removeClass("hidden");
  $("#dataCloseButton").removeClass("hidden");
}

function clearAll() {
  if (map.hasLayer(heat) == true) {
    console.log("clearing previous heatmap")
    map.removeLayer(heat)
  }
  $("#timeStamp").addClass("hidden");
}
