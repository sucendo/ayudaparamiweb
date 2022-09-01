
	mapboxgl.accessToken = 'pk.eyJ1Ijoic3VjZW5kbyIsImEiOiJja3dvd243c3EwNzFhMm5sY3BycXZocXB6In0.JzhjXlVPZEUl_lr4mBw8zw';
    const map = new mapboxgl.Map({
        container: 'map',
        zoom: 11.53,
        center: [6.5615, 46.0598],
        pitch: 75,
        bearing: -180,
        style: 'mapbox://styles/mapbox/satellite-streets-v11',
        projection: 'globe',
        interactive: true
    });

    // `routes` comes from https://docs.mapbox.com/mapbox-gl-js/assets/routes.js,
    // which has properties that are in the shape of an array of arrays that correspond
    //  to the `coordinates` property of a GeoJSON linestring, for example:
    // [
    //   [6.56158, 46.05989],
    //   [6.56913, 46.05679],
    //   ...
    // ]
    // this is the path the camera will look at
    const targetRoute = routes.target;
    // this is the path the camera will move along
    const cameraRoute = routes.camera;

    // add terrain, sky, and line layers once the style has loaded
    map.on('load', () => {
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
        });
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
      // Add some fog in the background
        map.setFog({
            'range': [-0.5, 2],
            'color': 'white',
            'horizon-blend': 0.2
        });  
      // Add a sky layer over the horizon
        map.addLayer({
            'id': 'sky',
            'type': 'sky',
            'paint': {
                'sky-type': 'atmosphere',
                'sky-atmosphere-color': 'rgba(85, 151, 210, 0.5)'
            }
        });
        map.addSource('trace', {
            type: 'geojson',
            data: {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': targetRoute
                }
            }
        });
        map.addLayer({
            type: 'line',
            source: 'trace',
            id: 'line',
            paint: {
                'line-color': 'orange',
                'line-width': 5
            },
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            }
        });
    });

    // wait for the terrain and sky to load before starting animation
    map.on('load', () => {
        const animationDuration = 10000;
        const cameraAltitude = 4000;
        // get the overall distance of each route so we can interpolate along them
        const routeDistance = turf.lineDistance(turf.lineString(targetRoute));
        const cameraRouteDistance = turf.lineDistance(
            turf.lineString(cameraRoute)
        );

        let start;

        function frame(time) {
            if (!start) start = time;
            // phase determines how far through the animation we are
            const phase = (time - start) / animationDuration;

            // phase is normalized between 0 and 1
            // when the animation is finished, reset start to loop the animation
            if (phase > 1) {
                // wait 1.5 seconds before looping
                setTimeout(() => {
                    start = 0.0;
                }, 1500);
            }

            // use the phase to get a point that is the appropriate distance along the route
            // this approach syncs the camera and route positions ensuring they move
            // at roughly equal rates even if they don't contain the same number of points
            const alongRoute = turf.along(
                turf.lineString(targetRoute),
                routeDistance * phase
            ).geometry.coordinates;

            const alongCamera = turf.along(
                turf.lineString(cameraRoute),
                cameraRouteDistance * phase
            ).geometry.coordinates;

            const camera = map.getFreeCameraOptions();

            // set the position and altitude of the camera
            camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
                {
                    lng: alongCamera[0],
                    lat: alongCamera[1]
                },
                cameraAltitude
            );

            // tell the camera to look at a point along the route
            camera.lookAtPoint({
                lng: alongRoute[0],
                lat: alongRoute[1]
            });

            map.setFreeCameraOptions(camera);

            window.requestAnimationFrame(frame);
        }

        window.requestAnimationFrame(frame);
    });
