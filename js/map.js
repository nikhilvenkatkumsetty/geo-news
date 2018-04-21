var map = L.map('map').setView([52.674024, -8.571866], 2);
var popup = L.popup();

L.tileLayer(
    'https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGRlbGVhc' +
    '3RhciIsImEiOiJjamE5cTQ1aDEwYjE2MzJuY3BpbGFqNHZ0In0.i9MMtdk2VGdKsLCW50qHMw',
    {
      attribution:
      'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © ' +
      '<a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken:
          'pk.eyJ1IjoicGRlbGVhc3RhciIsImEiOiJjamE5cTQ1aDEwYjE2MzJuY3BpbGFqNHZ0In0.i9MMtdk2VGdKsLCW50qHMw',
    },
).addTo(map);


map.setZoom(2);


function onMapClick(e) {
  popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
}

map.on('click', onMapClick);
