const container = document.querySelector('.container');
const boton_mapa = document.querySelector('#boton_mapa');
const mostrar_coordenadas = document.querySelector('#mostrar_coordenadas');
var crd;
localStorage.clear();

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

let map;
function initMap()
{
  map = new google.maps.Map(document.getElementById("map"), {
  center: { lat:crd.latitude, lng:crd.longitude  },
  zoom: 16,
  zoomControl:false,
  });
}

// boton para ocultar el container
boton_mapa.addEventListener('click', function()
{
  if(container.style.visibility == 'visible'){
    container.style.visibility = 'hidden';
  }else{
    container.style.visibility = 'visible';
  }
});



//guardar coordenadas en localStorage
var coordenadas = [];
function guardarCoordenadaActual(){
  const click = new Audio('click.mp3');
  click.play();
  click.loop = false;
  coordenadas.push([crd.latitude, crd.longitude]);
  window.localStorage.setItem(
    "coordenadas", JSON.stringify(coordenadas)
  );
}
