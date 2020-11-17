var map;
var myLat;
var myLong;

function initMap() {
    x=navigator.geolocation;
    x.getCurrentPosition(success);
    function success(position){
        myLat = position.coords.latitude;
        myLong = position.coords.longitude;
    }
    console.log(myLong);
    var coord = new google.maps.LatLng({ lat: 53.350140, lng: -6.266155 });
    var mapOptions = {
      zoom: 16,
      center: coord,
    }

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var marker = new google.maps.Marker({
    position: coord,
    title:"Hello World!"
    });
    marker.setMap(map);


}
