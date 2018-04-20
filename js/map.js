var map = L.map('map').setView([52.674024, -8.571866], 2);

L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png',
    {
      maxZoom: 18,
      minZoom: 2
    }
).addTo(map);


map.setZoom(2);




