$(document).ready(function(){
  $('#generate').click(function(){
    getLatestGeoNews();
  });
});

function init() {
  var input = document.getElementById("keyword").value
  getLatestGeoNews(input)
}

function getLatestGeoNews(input) {
  $.getJSON("//api.gdeltproject.org/api/v2/geo/geo?query="+input+"&format=geoJSON",function(data){
    parseData(data);
    console.log(data);
  })
}

function parseData(data) {
  let locationsArray = [];
  let heat = L.heatLayer(locationsArray, { radius: 15 });
  for (let i = 0; i < data.features.length; i++) {
    let reversedLatLng = [
      data.features[i].geometry.coordinates[1],
      data.features[i].geometry.coordinates[0],
      data.features[i].properties.count
    ]
    locationsArray.push(reversedLatLng)
  }
  if (map.hasLayer(heat) == true) {
    map.removeLayer(heat)
    console.log("removed previous heatmap")
  }
  map.addLayer(heat);
}

