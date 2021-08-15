const container = document.querySelector('.container');
const boton_mapa = document.querySelector('#boton_mapa');
localStorage.clear();
// geolocalizacion
//

//
// function getGeolocation(id)
// {
//   const $id = document.getElementById(id),
//   options = {
//     enableHighAccuracy:true,
//     timeout:5000,
//     maximumAge:0,
//   };
//
//   target = {
//     latitude : 0,
//     longitude: 0,
//   }
//
//   const success = (position) => {
//     crd = position.coords;
//     mostrar_coordenadas.innerHTML = "Lat: " + crd.latitude + "<br>" + "Long: " + crd.longitude + "<br>" + "Velocidad: "+ crd.speed + "<br>" + "Prec: " + crd.accuracy;
//
//     if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
//       console.log('Congratulation, you reach the target');
//       navigator.geolocation.clearWatch(id);
//     }
//   }
//
//   const error = (er) => {
//     $id.innerHTML = `<p><mark>Error ${er.code}: ${er.message}</mark></p>`;
//     console.log(`Error ${er.code}:${er.message}`);
//   }
//   id = navigator.geolocation.watchPosition(success, error, options);
// }

const mostrar_coordenadas = document.querySelector('#mostrar_coordenadas');
var crd;

function getGeolocation(){
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    crd = pos.coords;
    mostrar_coordenadas.innerHTML = "Lat: " + crd.latitude + "<br>" + "Long: " + crd.longitude + "<br>" + "Velocidad: "+ crd.speed + "<br>" + "Prec: " + crd.accuracy;
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
    console.log("mapa iniciado");
    let map;
    function initMap(){
      map = new google.maps.Map(document.getElementById("map"), {
      center: { lat:crd.latitude, lng:crd.longitude  },
      zoom: 16,
      zoomControl:false,
      });
    }
    google.maps.event.addDomListener(window, 'load', initMap);
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  navigator.geolocation.watchPosition(success, error, options);

}




//
// let map;
// var cr = [ 20.669859, -103.8269931];
// function initMap()
// {

  //
  // console.log("mapa iniciado");
  // map = new google.maps.Map(document.getElementById("map"), {
  // center: { lat:crd.latitude, lng:crd.longitude  },
  // zoom: 16,
  // zoomControl:false,
  // });

  // console.log("mapa iniciado");
  // map = new google.maps.Map(document.getElementById("map"), {
  // center: { lat:cr[0], lng:cr[1] },
  // zoom: 16,
  // zoomControl:false,
  // });

/*
  for (var i = 0; i < value.length; i++) {
    const marker = new google.maps.Marker({
     position: { lat: value[i][0], lng: value[i][1] },
     map,
     title:"tope",
     icon: './icon.png',
    });
  }*/
  //map.setOptions({ styles: styles["hide"] });
// }

//
// const styles = {
//   default: [],
//   hide: [
//     {
//       featureType: "poi.business",
//       stylers: [{ visibility: "off" }],
//     },
//     {
//       featureType: "transit",
//       elementType: "labels.icon",
//       stylers: [{ visibility: "off" }],
//     },
//   ],
// };

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














// window.localStorage.setItem('Lat', crd.latitude);
// window.localStorage.setItem('Lng', crd.longitude);

// var lat = "Lat:";
// var lng = "Lng:";
// var borrarLatSt, borrarLngSt;
//
// function setCoords(){
//   try {
//     latSt = window.localStorage.setItem("Lat:", crd.latitude);
//     lngSt = window.localStorage.setItem("Lng:", crd.longitude);
//   } catch (e) {
//     console.error("Error al intentar obtener lat lng ");
//   }
// }

// (function ()
// {
//   //try {
//     console.log("funcion de guardar coord");
//     window.localStorage.setItem('Lat', crd.latitude);
//     window.localStorage.setItem('Lng', crd.longitude);
//   //} catch (e) {
//   //  console.error('Error al intentar guardar coordenada en localStorage');
//   //}
// }());


// (function (){
//   console.log(window.localStorage.getItem('Lat'));
//   console.log(window.localStorage.getItem('Lng'));
// }());

// function getCoords(){
//   var intervalo;
//   intervalo = setInterval(coords,5000);
// }
//
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
// var coordenadas = [];
//
// const click = new Audio('click.mp3');
//
// function save_coords()
// {
//   click.play();
//   click.loop = false;
//   coordenadas.push([crd.latitude, crd.longitude]);
//   window.localStorage.setItem(
//     "coordenadas", JSON.stringify(coordenadas)
//   );
// }
//
// var value = localStorage.getItem('coordenadas');
// value = JSON.parse(value);
//
// // google Maps
// function visibilidad(){
//   if (container.style.visibility == 'hidden') {
//     container.style.visibility = 'visible';
//     mapa.innerHTML = "<img src='./location_on_white_24dp.svg'>"
//   }else{
//     container.style.visibility = 'hidden';
//     mapa.innerHTML = "<img src='./location_off_white_24dp.svg'>"
//   }
// }
// const container = document.querySelector('.container');
// const mapa = document.getElementById('mapa');
// const map1 = document.getElementById('map');
// mapa.addEventListener('click', visibilidad, false);
