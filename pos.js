
var id, target, option, mapa;
const d = document;
var showCord = d.getElementById('geolocation');

function getGeolocation(id)
{

  const $id = d.getElementById(id),
  options = {
    enableHighAccuracy:true,
    timeout:5000,
    maximumAge:0,
  };

  target = {
    latitude : 0,
    longitude: 0,
  }

  const success = (position) => {

    var crd = position.coords;
    showCord.innerHTML = "Lat: " + crd.latitude + "<br>" + "Long: " + crd.longitude + "<br>" + "Prec: " + crd.accuracy;
    console.log("Lat: " + crd.latitude + " Long: " + crd.longitude);
    if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
      console.log('Congratulation, you reach the target');
      navigator.geolocation.clearWatch(id);
    }

    mapa = d.getElementById('mapa');
    mapa.innerHTML=`<a href="https://www.google.com/maps/@${crd.latitude},${crd.longitude},20z" target="_blank" rel="noopener">Ver en Google Maps</a>`;

  }

  const error = (er) => {
    $id.innerHTML = `<p><mark>Error ${er.code}: ${er.message}</mark></p>`;
    console.log(`Error ${er.code}:${er.message}`);
  }

  id = navigator.geolocation.watchPosition(success, error, options);
}
