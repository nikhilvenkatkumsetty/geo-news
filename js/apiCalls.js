$(document).ready(function(){
  $('#generate').click(function(){
    getLatestGeoNews();
  });
});

function getLatestGeoNews() {
  $.getJSON("//api.gdeltproject.org/api/v2/geo/geo?query=trump&format=geoJSON",function(data){
    parseData(data);
    console.log(data);
  })
}

function parseData(data) {
  let locationsArray = []
  for (let i = 0; i < data.features.length; i++) {
    let reversedLatLng = [
        data.features[i].geometry.coordinates[1],
        data.features[i].geometry.coordinates[0],
        data.features[i].properties.count
    ]
    locationsArray.push(reversedLatLng)
  }
  console.log(locationsArray)
  var heat = L.heatLayer(locationsArray, { radius: 15 });
  map.addLayer(heat);
}