let heat, inputString;

$(document).ready(function(){
  $('#generate').click(function(){
    getLatestGeoNews();
  });
});

function init() {
  var input = document.getElementById("keyword").value
  inputString = input;
  getLatestGeoNews(input)
}

function getLatestGeoNews(input) {
  $.getJSON("//api.gdeltproject.org/api/v2/geo/geo?query="+input+"&format=geoJSON&mode=pointdata&timespan=15",function(data){
    parseData(data);
    console.log(data);

  })
}

function parseData(data) {
  let locationsArray = [];
  if (map.hasLayer(heat) == true) {
    map.removeLayer(heat)
    console.log("removed previous heatmap")
  }
  for (let i = 0; i < data.features.length; i++) {
    let reversedLatLng = [
      data.features[i].geometry.coordinates[1],
      data.features[i].geometry.coordinates[0],
      data.features[i].properties.count
    ]
    locationsArray.push(reversedLatLng)
  }
  heat = L.heatLayer(locationsArray, { radius: 15 });
  map.addLayer(heat);
}

function getNewsArticles(latlng) {
  $.getJSON("//api.gdeltproject.org/api/v2/geo/geo?query="+inputString+"&format=geoJSON&mode=pointdata&timespan=15",function(data){
    console.log(data);
    getNearest(data, latlng);
  })
}

function getNearest(data, latlng) {
  let closeArticles = [];
  console.log(latlng.lng,latlng.lat,data.features[0].geometry.coordinates[0],data.features[0].geometry.coordinates[1])
  for (let i = 0; i < data.features.length; i++) {
     let latDist = latlng.lat - data.features[i].geometry.coordinates[1];
     if (latDist < 5 && latDist > -5) {
       let lngDist = latlng.lng - data.features[i].geometry.coordinates[0];
       if (lngDist < 5 && lngDist > -5) {
         closeArticles.push(data.features[i])
       }
     }
  }
  var txt = "";
  $("#table tr").remove();
  if (closeArticles.length > 0) {
    txt += "<tr><th>"+"Country"+"</th><th>"+"Hit count"+"</th></tr>"
    for (let i = 0; i < closeArticles.length; i++) {
      let htmlParsed = closeArticles[i].properties.html.split("<br>")
      txt += "<tr><td>"+closeArticles[i].properties.name+"</td><td>"+htmlParsed[0]+"</td></tr>"
      //console.log(closeArticles[i].properties.html)
    }
    if(txt != ""){
      $("#table").append(txt).removeClass("hidden");
    }
  }
}
