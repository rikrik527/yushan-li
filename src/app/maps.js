const loadGoogleMapsApi = require('load-google-maps-api');
var googleMapKey = 'AIzaSyB-101RMEQq1JIe_qCG45ZBVk3u54IB0GY';

class Map {
  static loadGoogleMapsApi() {
    return loadGoogleMapsApi({
      key: process.env.googleMapKey,
    });
  }
  static createMap(googleMaps, mapElement) {
    return new googleMaps.Map(mapElement, {
      center: { lat: 24.92763, lng: 120.384307 },
      zoom: 8,
    });
  }
  static drawingManager() {
    return new google.maps.drawing.DrawingManager({});
  }
}
export { Map };
