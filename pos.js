
var id, target, option, mapa, intervalo, intervalo2;
const d = document;
var ult = document.getElementById('ult');
var act = document.getElementById('act');
var crd;
var showCord = document.getElementById('geolocation');

// intervalos
// intervalo2 = setInterval(function () {
//   var pActual = [crd.latitude,crd.longitude];
//   console.log("Actual:"+"Lat: "+ pActual[0]+ " Lng: " + pActual[1]);
//   intervalo;
//   return (act.innerHTML = "Actual posicion: " + "Lat:" + pActual[0] + " Lng: " + pActual[1] + "<br>");
// },5000);
//
// intervalo = setInterval(function () {
//   var pUltima = [crd.latitude,crd.longitude];
//   console.log("Última: "+"Lat: "+ pUltima[0]+ " Lng: " + pUltima[1]);
//   return (ult.innerHTML = "Última posicion: " + "Lat:" + pUltima[0] + " Lng: " + pUltima[1] + "<br>");
// },10000);


// funcion de geolocation
function getGeolocation(id){

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

//    console.log("Actual:" + "Lat: " + crd.latitude + " Lng: " + crd.longitude);

    mapa = d.getElementById('mapa');
    mapa.innerHTML=`<a href="https://www.google.com/maps/@${crd.latitude},${crd.longitude},20z" target="_blank" rel="noopener">Ver en Google Maps</a>`;

  }

  const error = (er) => {
    $id.innerHTML = `<p><mark>Error ${er.code}: ${er.message}</mark></p>`;
    console.log(`Error ${er.code}:${er.message}`);
  }

  id = navigator.geolocation.watchPosition(success, error, options);

}

// window.addEventListener("load", intervalo2, false);
