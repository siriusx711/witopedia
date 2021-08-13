var id, target, option;
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
    showCord.innerHTML = "Lat: " + crd.latitude + "<br>" + "Long: " + crd.longitude + "<br>" + "Velocidad: "+ crd.speed + "<br>" + "Prec: " + crd.accuracy;
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

const click = new Audio('click.mp3');

function save_coords()
{
  click.play();
  click.loop = false;
  coordenadas.push([crd.latitude, crd.longitude]);
  window.localStorage.setItem(
    "coordenadas", JSON.stringify(coordenadas)
  );
}

var value = localStorage.getItem('coordenadas');
value = JSON.parse(value);

// google Maps
function visibilidad(){
  if (map1.style.visibility == 'hidden') {
    map1.style.visibility = 'visible';
    mapa.innerHTML = "<img src='./location_off_white_24dp.svg'>"
  }else{
    map1.style.visibility = 'hidden';
    mapa.innerHTML = "<img src='./location_on_white_24dp.svg'>"
  }
}
const mapa = document.getElementById('mapa');
const map1 = document.getElementById('map');
mapa.addEventListener('click', visibilidad, false);

let map;

function initMap() {
  console.log("mapa iniciado");
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat:crd.latitude , lng:crd.longitude  },
    zoom: 16,
    zoomControl:false,
  });

  for (var i = 0; i < value.length; i++) {
    const marker = new google.maps.Marker({
     position: { lat: value[i][0], lng: value[i][1] },
     map:map,
     title:"tope",
     icon: './icon.png',
    });
  }
  map.setOptions({ styles: styles["hide"] });
  
}

const styles = {
  default: [],
  hide: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ],
};
