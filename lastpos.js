// window.addEventListener("load", intervalo, false);
var ultima = document.getElementById('ult');
var actual = document.getElementById('act');

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 10000,
};

function success(pos) {
  var crd = pos.coords;
  var lst_lat, lst_lng;
  lst_lat = ultima.innerHTML = 'Last Latitude : ' + crd.latitude;
  lst_lng = actual.innerHTML = 'Last Longitude : ' + crd.longitude;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);
