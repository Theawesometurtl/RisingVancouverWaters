
var map = L.map('map').setView([49.208985, -122.948062], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//chatgpt comes in clutch
// Set the water level in meters
var waterLevel = -2;

// Get the current bounds of the map
var mapBounds = map.getBounds();

// Calculate the bounds of the water layer
var southWest = mapBounds.getSouthWest();
var northEast = mapBounds.getNorthEast();
var waterSouthWest = L.latLng(southWest.lat, southWest.lng);
var waterNorthEast = L.latLng(northEast.lat + waterLevel / 111000, northEast.lng);
var waterBounds = L.latLngBounds(waterSouthWest, waterNorthEast);

// Create the water layer
var waterLayer = L.rectangle(waterBounds, {
  color: '#3388ff',
  weight: 0,
  opacity: 0.5,
  fillOpacity: 0.5,
  elevation:10,
  elevationMode: "heightAboveGround"
}).addTo(map);

// Update the bounds of the water layer when the map moves
map.on('move', function() {
  // Get the new bounds of the map
  var newBounds = map.getBounds();

  // Calculate the new bounds of the water layer
  var southWest = newBounds.getSouthWest();
  var northEast = newBounds.getNorthEast();
  var waterSouthWest = L.latLng(southWest.lat, southWest.lng);
  var waterNorthEast = L.latLng(northEast.lat + waterLevel / 111000, northEast.lng);
  var waterBounds = L.latLngBounds(waterSouthWest, waterNorthEast);

  // Update the bounds of the water layer
  waterLayer.setBounds(waterBounds);
});
