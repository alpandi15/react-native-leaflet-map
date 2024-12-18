import { MarkerProps } from './types';

const generateMarkers = (markers: MarkerProps[]) => {
    var markersString = '';

    var iconScript = '';
    var title = '';

    if ( markers.length > 0 ) {
        markers.forEach((element, i) => {
            iconScript = element.iconUrl
                ? (`L.icon({ iconUrl: '${element.iconUrl}', iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] })`)
                : ('L.icon({ iconUrl: \'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png\', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] })');

            title = (element.title ? `<b>${element.title}</b>` : '');

            markersString += (`\n\n marker_${i} = L.marker([${element.latitude}, ${element.longitude}], { icon: ${iconScript} })
            .addTo(map)
            .bindPopup('<div style="text-align: center;">${title}${element.description ? '<br>' + element.description : ''}</div>');`);
        });
    }

    return markersString;
};

const addMarkerCenter = (markerCenter: boolean) => markerCenter ? (`
    var center = map.getCenter(); // Get center map
    var markerX = L.marker([center.lat, center.lng]).addTo(map);
    markerX.bindPopup('This Center').openPopup();
`) : ('');

const fitBounds = (locations: MarkerProps[]) => {

    if ( locations.length > 0 ) {
        var bounds: any = [];


        locations.forEach((location: MarkerProps) => {
            bounds.push([location.latitude, location.longitude]);
        });

        // STRINGIFY THE BOUNDS
        bounds = JSON.stringify(bounds);

       return (`
         map.fitBounds(${bounds});
        `);
    } else {
        return ('');
    }
};

const generateRouteDirection = (markers: MarkerProps[]) => {
    let routeScript = '';
    if (markers?.length) {

        // var startPoint = L.latLng(-6.200829, 106.823072); // Starting point coordinates
        // var dropOffPoint = L.latLng(-6.223469, 106.848250); // Drop-off point coordinates
        // var dropOffPoint2 = L.latLng(-6.189878, 106.868477); // Drop-off 2 point coordinates

        // // Create routing control
        // var control = L.Routing.control({
        //     waypoints: [
        //         startPoint,
        //         dropOffPoint,
        //         dropOffPoint2
        //     ],
        //     routeWhileDragging: true,
        // }).addTo(map);

        let dropPoints: any[] = [];
        markers.forEach(marker => {
            dropPoints.push(`L.latLng(${marker?.latitude}, ${marker.longitude})`);
        });

        routeScript = (`
            L.Routing.control({
                waypoints: [${dropPoints}],
                routeWhileDragging: true
            }).addTo(map);
        `);

        return routeScript;
    }

    return routeScript;
};

export const MyScripts = {
    generateMarkers,
    addMarkerCenter,
    fitBounds,
    generateRouteDirection,
};
