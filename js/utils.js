function init(initval) {
  var input = document.getElementById("keyword").value
  inputString = input;
  if (initval == 1) {
    getLatestGeoNews(input)
  } else if (initval == 2) {
    simulate24Hrs(input)
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
