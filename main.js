var crd, id, target, options;
const container = document.querySelector('.container');
const boton_mapa = document.querySelector('#boton_mapa');
const mostrar_coordenadas = document.querySelector('#mostrar_coordenadas');

// geolocalizacion
function getGeolocation(id)
{
  const $id = document.getElementById(id),
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
    mostrar_coordenadas.innerHTML = "Lat: " + crd.latitude + "<br>" + "Long: " + crd.longitude + "<br>" + "Velocidad: "+ crd.speed + "<br>" + "Prec: " + crd.accuracy;
    guardarCoordenadas();


    if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
      console.log('Congratulation, you reach the target');
      navigator.geolocation.clearWatch(id);
    }
  }

  const error = (er) => {
    $id.innerHTML = `<p><mark>Error ${er.code}: ${er.message}</mark></p>`;
    console.log(`Error ${er.code}:${er.message}`);
  }
  id = navigator.geolocation.watchPosition(success, error, options);
}

// guardar coordenadas
var lat, lng;
function guardarCoordenadas(){
  lat = window.localStorage.setItem("Lat", crd.latitude);
  lng = window.localStorage.setItem("Lng", crd.longitude);
}

// parsear latitud y longitud
lat = window.localStorage.getItem('Lat');
lat = parseFloat(lat);
lng = window.localStorage.getItem('Lng');
lng = parseFloat(lng);

var coordenadas = [lat, lng];

coordenadas[0] = parseFloat(coordenadas[0]);
coordenadas[1] = parseFloat(coordenadas[1]);

(function(){
  window.setTimeout(iniciarMapa, 5000);
}());

function iniciarMapa(){
  console.log('iniciando mapa');
  initMap();
  //google.maps.event.addDomListener(window, 'load', initMap);
}

// google maps
function initMap()
{
  map = new google.maps.Map(document.getElementById("map"), {
  center: { lat:coordenadas[0], lng:coordenadas[1] },
  zoom: 16,
  zoomControl:false,
  });
  console.log('google maps');
/*
  for (var i = 0; i < value.length; i++) {
    const marker = new google.maps.Marker({
     position: { lat: value[i][0], lng: value[i][1] },
     map,
     title:"tope",
     icon: './icon.png',
    });
  }*/
  // map.setOptions({ styles: styles["hide"] });
}






















// function coords(){
//   $lat.innerHTML = "Lat: " + window.localStorage.getItem(lat);
//   $lng.innerHTML = "Lng: " + window.localStorage.getItem(lng);
//   borrarLatSt = window.localStorage.removeItem(lat);
//   borrarLngSt = window.localStorage.removeItem(lng);
//   setCoords();
// }
//
// getCoords();


//
// // boton para ocultar el container
// boton_mapa.addEventListener('click', function()
// {
//   if(container.style.visibility == 'hidden'){
//     container.style.visibility = 'visible';
//   }else{
//     container.style.visibility = 'hidden';
//   }
// });
//
//
