var map;

onload = function() {   // Map initialized
  map = L.map('map');
  L.tileLayer(
      'https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGRlbGVhc' +
      '3RhciIsImEiOiJjamE5cTQ1aDEwYjE2MzJuY3BpbGFqNHZ0In0.i9MMtdk2VGdKsLCW50qHMw',
      {
        maxZoom: 18,
        setZoom: 2.5,
        id: 'mapbox.streets',
        accessToken:
            'pk.eyJ1IjoicGRlbGVhc3RhciIsImEiOiJjamE5cTQ1aDEwYjE2MzJuY3BpbGFqNHZ0In0.i9MMtdk2VGdKsLCW50qHMw',
      },
  ).addTo(map);
  map.setView([33.947, 0.6111 ], 2.5);  // view set
  document.getElementById('map').style.display = 'block';
  setTimeout(map.invalidateSize.bind(map)); // map made responsive
  map.on('click', onMapClick); // click listener
}

function onMapClick(e) {
  getNewsArticles(e.latlng) // nearest article for click location called here
}

