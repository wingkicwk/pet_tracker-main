$(document).ready(function () {

    initMap();
});


function initMap() {

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoib2hteWhhcHB5IiwiYSI6ImNrYjdyaWg0cDA0bXMycXFyNzgxdmkyN3kifQ.gcq3O8-AveWKXNS5TUGL_g'
    }).addTo(map);

    map.locate({ setView: true, watch: true });

    var onLocationFound = function(e){

        // create custom icon
        var customIcon = L.icon({
            iconUrl: './static/img/user_marker.png',
            iconSize: [45, 45], // size of the icon
            });

        L.marker(e.latlng, {icon: customIcon})
        .addTo(map)
        .bindPopup("Centre")
        // .openPopup();
        centreLocation = e.latlng;
        currentCentre = centreLocation;
        // map.setView(e.latlng, 14);
    };
    map.on('locationfound', onLocationFound);
}