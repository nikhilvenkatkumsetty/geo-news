let stream = false;

function init(initval) {
  var input = document.getElementById("keyword").value
  inputString = input;
  if (initval == 1) {
    getLatestGeoNews(input)
    $("#chartButton").removeClass("hidden");
  } else if (initval == 2) {
    if (stream == false) {
      stream = true
      simulate24Hrs(input)
      $('#simulateButton').text("Stop Simulation").removeClass("simulateBlue").addClass("simulateRed");
      $("#timeStamp").removeClass("hidden");
    } else if (stream == true) {
      stream = false
      clearAll();
      $('#simulateButton').text("Start Simulation").removeClass("simulateRed").addClass("simulateBlue");
    }
  }
}

function reverseLatLng(lat, lng, count) {
  let reversedLatLng = [
    lng,
    lat,
    count
  ]
  return reversedLatLng
}

function generateHeatMap(latlng) {
  if (map.hasLayer(heat) == true) {
    console.log("clearing previous heatmap")
    map.removeLayer(heat)
  }
  heat = L.heatLayer(latlng, {radius: 15});
  map.addLayer(heat);
}

function closeTable() {
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
