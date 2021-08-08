
var id, target, option, mapa;
const d = document;

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

    var crd = position.coords;
    let showCord = document.getElementById('geolocation');
    showCord.innerHTML = "Lat: " + crd.latitude + "<br>" + "Long: " + crd.longitude + "<br>" + "Prec: " + crd.accuracy;
    console.log(position);

      if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
        console.log('Congratulation, you reach the target');
        navigator.geolocation.clearWatch(id);
      }

    mapa = d.getElementById('mapa');
    mapa.innerHTML=`<a href="https://www.google.com/maps/@${crd.latitude},${crd.longitude},20z" target="_blank" rel="noopener">Ver en Google Maps</a>`;

    // colocar el codigo del intervalo
    var pActual = [crd.latitude,crd.longitude];
    var pUltima = [crd.latitude,crd.longitude];
    function intervalo(){
      let lst = pUltima;
      return lst;
    }

    window.setInterval(intervalo(), 3000);

    console.log(pActual + " " + pUltima);
    if (pActual[0,1] == pUltima[0,1]) {
      console.log("El dispositivo no se ha movido");
    }else{
      let dir = document.getElementById('dir');
      dir.innerHTML = "El dispositivo se ha movido";
    }
    // var lat = crd.latitude;
    // var lng = crd.longitude;
    //
    // function setLastPosition(lat,lng){
    //   var pPrevia = [lat,lng];
    //   return pPrevia;
    // }
    //
    // console.log(window.setInverval(setLastPosition,5000));

  }

  const error = (er) => {
    $id.innerHTML = `<p><mark>Error ${er.code}: ${er.message}</mark></p>`;
    console.log(`Error ${er.code}:${er.message}`);
  }







  id = navigator.geolocation.watchPosition(success, error, options);

}
