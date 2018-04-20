let locationsArray = [];
var heat;
var layers = [];

$(document).ready(function(){
  $('#generate').click(function(){
    getLatestGeoNews();
  });
});

function init() {
  var input = document.getElementById("keyword").value
  console.log(input)
  getLatestGeoNews(input)
}

function getLatestGeoNews(input) {
  $.getJSON("//api.gdeltproject.org/api/v2/geo/geo?query="+input+"&format=geoJSON",function(data){
    parseData(data);
    console.log(data);
  })
}


function parseData(data) {
  for (let i = 0; i < data.features.length; i++) {
    let reversedLatLng = [
        data.features[i].geometry.coordinates[1],
        data.features[i].geometry.coordinates[0],
        data.features[i].properties.count
    ]
    locationsArray.push(reversedLatLng)
  }
  //console.log(locationsArray)
  heat = L.heatLayer(locationsArray, { radius: 15 });
  map.addLayer(heat);
  console.log(layers);
}

