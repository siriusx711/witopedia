/*
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');

  let showCord = document.getElementById('label');
  showCord.innerHTML = crd.latitude + " " + crd.longitude;
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);
*/
const d = document,
n = navigator;

function getGeolocation(id){
  const $id = d.getElementById(id),
  options = {
    enableHighAccuracy:true,
    timeout:5000,
    maximumAge:0,
  };

  const success = (position) => {
    var crd = position.coords;
    let showCord = document.getElementById('geolocation');
    showCord.innerHTML = crd.latitude + " " + crd.longitude;
    console.log(position);
  }

  const error = (er) => {
    $id.innerHTML = `<p><mark>Error ${er.code}: ${er.message}</mark></p>`;
    console.log(`Error ${er.code}:${er.message}`);
  }

  n.geolocation.getCurrentPosition(success, error, options);

}
