import {Client} from "@googlemaps/google-maps-services-js";

<script src="https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&callback=initMap" async defer></script>

function computeDistance(lat_x, lng_x, lat_y, lng_y) {

    const service = new google.maps.DistanceMatrixService();

    // Define origins and destinations
    const origin = { lat: lat_x, lng: lng_x };
    const destination = { lat: lat_y, lng: lng_y };

    const request = {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      };

    service.getDistanceMatrix(request, (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
            const results = response.rows[0].elements;
      
            results.forEach((element, index) => {
            if (element.status === "OK") {
                const distance = element.distance.text;
                const duration = element.duration.text;
                console.log(`Distance: ${distance}, Duration: ${duration}`);
            } else {
                console.error("Error with specific route:", element.status);
            }
        });
        } else {
        console.error("Error was: " + status);
        }
  });
}
