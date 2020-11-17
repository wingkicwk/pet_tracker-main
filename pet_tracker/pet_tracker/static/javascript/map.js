let markers = [];
let map;

function initMap() {
  x=navigator.geolocation;
  x.getCurrentPosition(success);

  function success(position){
      var myLat = position.coords.latitude;
      var myLong = position.coords.longitude;

      var coords = new google.maps.LatLng(myLat, myLong);

      var mapOptions = {
          zoom: 16,
          center: coords,
      }

      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var marker = new google.maps.Marker({
          map:map,
          position:coords,
          draggable: true,
          title: "Drag me!"
      });
  }



}
