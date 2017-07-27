const directionsService = new google.maps.DirectionsService;
const directionsDisplay = new google.maps.DirectionsRenderer;



function startMap() {

    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = {
        library: {
            icon: iconBase + 'library_maps.png'
        }
    };

    // Example City

    // var cityExample = { lat: 40.415363, lng: -3.707398 };

    // Map initialization

    var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(40.415363, -3.707398),
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // Add a marker for City



    var locations = [
        //   Paris
        [48.864716, 2.349014],
        // Madrid
        [40.415363, -3.707398],
        // Barcelona
        [41.390205, 2.154007],
        //Berlin 
        [52.520645, 13.409779]
    ];

    var markers = [];
    var pinPoint;

    for (var i = 0; i < locations.length; i++) {
        pinPoint = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][0], locations[i][1]),
            map: map,
            title: "Click to zoom"
        });
        markers.push(pinPoint);
    }

    markers.map((item) => {
        item.addListener('click', function () {
            map.setCenter(item.getPosition());
            map.setZoom(8);
        });
    });
        
        // pinPoint.addListener('click', function () {
        //     map.setCenter(pinPoint.getPosition());
        //     map.setZoom(10);
        // });
    
    var minValue = 1, maxValue = 8;

    google.maps.event.addListener(map, 'zoom_changed', function () {
        var zoom = map.getZoom();
        
        if (zoom > minValue && zoom < maxValue) {
            for (var i = 0; i < locations.length; i++) {
                markers[i].setMap(map);
            }
        }
        else {
            for (var i = 0; i < locations.length; i++) {
                markers[i].setMap(null);
            }
        }
    });

    ///////////


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const user_location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Center map with user location
            // map.setCenter(user_location);

            // Add a marker for your user location
            var currentLocation = new google.maps.Marker({
                position: {
                    lat: user_location.lat,
                    lng: user_location.lng
                },
                map: map,
                icon: iconBase + 'library_maps.png',
                title: "You are here"
            });

        }, function () {
            console.log('Error in the geolocation service.');
        });
    } else {
        console.log('Browser does not support geolocation.');
    }





    var world_geometry = new google.maps.FusionTablesLayer({
        query: {
            select: 'geometry',
            from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
            where: "ISO_2DIGIT IN ('ES','BE','FR', 'DE','CZ')"
        },
        map: map,
        suppressInfoWindows: true
    });

}

startMap();

/////LLAMADA A AJAX

// function getBreweriesByLocation(lat, lng, radius, key) {

//   $.ajax({
//     url: "hhttp://api.brewerydb.com/v2/search/geo/point/?lat="+lat+"&lng="+lng+"&radius="+radius+"&key="+key,
//     method: "GET",
//     success: function (response) {
//       console.log(response);
//     },
//     error: function (err) {
//       console.log(err);
//     },
//   })
// }

// $("WHATDEFAK").on('click', function(){
//   getBreweriesByLocation(,,,,,);
// })