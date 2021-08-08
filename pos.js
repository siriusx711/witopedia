
var id, target, option, mapa, intervalo;
const d = document;
var crd;

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
    let showCord = document.getElementById('geolocation');
    showCord.innerHTML = "Lat: " + crd.latitude + "<br>" + "Long: " + crd.longitude + "<br>" + "Prec: " + crd.accuracy;
    //console.log(position);

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

// colocar el codigo del intervalo
var ult = document.getElementById('ult');
var act = document.getElementById('act');


function init(){
  var pActual = [crd.latitude,crd.longitude];
  intervalo = setInterval(function () {
    var pUltima = [crd.latitude,crd.longitude];
    console.log("Última: "+"Lat: "+ pUltima[0]+ " Lng: " + pUltima[1]);
    return (ult.innerHTML = "Última posicion: " + "Lat:" + pUltima[0] + " Lng: " + pUltima[1] + "<br>");
  },10000);

  intervalo2 = setInterval(function () {
    var pActual = [crd.latitude,crd.longitude];
    console.log("Actual:"+"Lat: "+ pActual[0]+ " Lng: " + pActual[1]);  //(dir.innerHTML = "Ultima posicion: " + pUltima[0,1] + "<br>" + "Actual: " + pActual[0,1]);
    intervalo;
    return (act.innerHTML = "Actual posicion: " + "Lat:" + pActual[0] + " Lng: " + pActual[1] + "<br>");
  },1000);

}

window.addEventListener("load", init, false);
