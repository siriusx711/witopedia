var id, target, option, mapa;
const d = document;
var showCord = d.getElementById('geolocation');
var latSt, lngSt, crd;
var $lat = d.getElementById('lat');
var $lng = d.getElementById('lng');

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
    crd = position.coords;
    showCord.innerHTML = "Lat: " + crd.latitude + "<br>" + "Long: " + crd.longitude + "<br>" + "Prec: " + crd.accuracy;
    if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
      console.log('Congratulation, you reach the target');
      navigator.geolocation.clearWatch(id);
    }
    //mapa = d.getElementById('mapa');
    //mapa.innerHTML=`<a href="https://www.google.com/maps/@${crd.latitude},${crd.longitude},20z" target="_blank" rel="noopener">Ver en Google Maps</a>`;
  }

  const error = (er) => {
    $id.innerHTML = `<p><mark>Error ${er.code}: ${er.message}</mark></p>`;
    console.log(`Error ${er.code}:${er.message}`);
  }
  id = navigator.geolocation.watchPosition(success, error, options);
}

var lat = "Lat:";
var lng = "Lng:";
var borrarLatSt, borrarLngSt;

function setCoords(){
  try {
    latSt = window.localStorage.setItem("Lat:", crd.latitude);
    lngSt = window.localStorage.setItem("Lng:", crd.longitude);
  } catch (e) {
    console.error("Error al intentar obtener lat lng ");
  }
}

function getCoords(){
  var intervalo;
  intervalo = setInterval(coords,5000);
}

function coords(){
  $lat.innerHTML = "Lat: " + window.localStorage.getItem(lat);
  $lng.innerHTML = "Lng: " + window.localStorage.getItem(lng);
  borrarLatSt = window.localStorage.removeItem(lat);
  borrarLngSt = window.localStorage.removeItem(lng);
  setCoords();
}

getCoords();

var coordenadas = [];

function save_coords()
{
  coordenadas.push([crd.latitude, crd.longitude]);
  window.localStorage.setItem(
    "coordenadas", JSON.stringify(coordenadas)
  );
parsearItems();
}
function parsearItems(){
  let value = localStorage.getItem('coordenadas');
  value = JSON.parse(value);
  console.log("{"+"lat:"+coordenadas[0][0]+","+"lng:"+coordenadas[0][1]+"}");
}

//console.log("{"+"lat:"+coordenadas[0][0]+","+"lng:"+coordenadas[0][1]+"}");
// google Maps
