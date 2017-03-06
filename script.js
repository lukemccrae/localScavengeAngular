var map;
var randomNumber;
var latPosition;
var longPosition;
var infowindow;
var allPlace = [];
var allPlaceName = [];
var placeGuess = [];
var placeType = [];
var dashes = [];

function initMap(latPosition, longPosition) {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 39.7576958,
            lng: -105.00724629999999
        },
        zoom: 2
    });
}

$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        latPosition = position.coords.latitude;
        longPosition = position.coords.longitude;
        $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latPosition + ',' + longPosition + '&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms')
            .done(function(data) {
                console.log(data);
                $('#greeting').append(data.results[5].formatted_address);
            })
            .fail(function(error) {
                console.log(error);
            })
        var panPoint = new google.maps.LatLng(latPosition, longPosition);
        map.panTo(panPoint)
        map.setZoom(16);
        initialize();
        console.log(latPosition, longPosition);
    })

    function initialize() {
        var pyrmont = new google.maps.LatLng(latPosition, longPosition);
        map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 14
        });
        var request = {
            location: pyrmont,
            radius: '800',
            types: ['bar']
        };
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                allPlace.push(place)
                allPlaceName.push(place.name)
                placeType.push(place.types[0])
                createMarker(results[i]);
            }
        }
        console.log(allPlace);
        console.log(allPlaceName);
        console.log(placeType);
        return guessMe();
    }

    function createMarker(place) {
        console.log(place.geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
        });
    }

    function guessMe() {
        randomNumber = Math.floor(Math.random() * allPlaceName.length)
        placeGuess.push(allPlaceName[randomNumber])
        $('#type').replaceWith("The place is in the category " + "'" + placeType[randomNumber] + ".'")
        console.log(allPlaceName.length);
        console.log(placeGuess);
        console.log(randomNumber);
        for (var i = 0; i < placeGuess[0].length; i++) {
            if (placeGuess[0][i] === " ") {
                dashes[i] = "&nbsp;";
            } else if (isLetter(placeGuess[0][i]) === false) {
                dashes.push(placeGuess[0][i])
            } else {
                dashes[i] = " _ ";
            }
        }


        function isLetter(c) {
            return c.toLowerCase() != c.toUpperCase();
        }
        console.log(allPlace);
        $('#guessForm').append(dashes)

    }

    function isLetter(c) {
        return c.toLowerCase() != c.toUpperCase();
    }
    $('#inputBox').keyup(function(a) {
        var keyPress = a.key;
        var submit = $('#inputBox').val();
        if (submit === placeGuess[0]) {
            $('#checkmark').css("display", "block")

        }
        console.log(a.key);
    })

    $('#update').click(function() {
        $.get('https://galvanize-cors.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=' + latPosition + ',' + longPosition + '&destination=' + allPlace[randomNumber].vicinity + '&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms')
            .done(function(data) {
                var location = data.routes[0].legs[0].steps[0].distance.value;
                $('#howClose').replaceWith("Your location is " + location + " feet away.")
                placeDetails()
                // placeDescription()
            })
    })

    function placeDetails() {
        $.get('https://galvanize-cors.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?reference=' + allPlace[randomNumber].reference + '&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms')
            .done(function(data) {
                var dynamicURL = "https://galvanize-cors.herokuapp.com/" + data.result.url;
                var onStreet = data.result.address_components[1].long_name;
                $('#street').replaceWith("Your place is on " + onStreet)
            })
    }
});
