let map;
let markers = [];

function initMap() {
    //show map
    var coord = new google.maps.LatLng({ lat: 53.350140, lng: -6.266155 });
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 53.350140, lng: -6.266155 },
        zoom: 13,
    });

    //create a button
    const locationButton = document.createElement("button");
    locationButton.textContent = "myLocation";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    //get user location by click on the button
    locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        map.setCenter(pos);
        },
        () => {
            handleLocationError(true, infoWindow, map.getCenter());
        }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    });

    //place a marker
    google.maps.event.addListener(map, 'click', function(event) {
    var marker = new google.maps.Marker({
        position: event.latLng,
        draggable:true,
        title: "Hello world!"
    });
    markers.push(marker);
    marker.setMap(map);
    console.log(markers);
//    console.log(marker.position);
    });
//    console.log(markers);

}
