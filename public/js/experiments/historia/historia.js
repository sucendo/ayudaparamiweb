mapboxgl.accessToken = 'pk.eyJ1Ijoic3VjZW5kbyIsImEiOiJja3dvd243c3EwNzFhMm5sY3BycXZocXB6In0.JzhjXlVPZEUl_lr4mBw8zw';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-v9',
        zoom: 0
    });

    map.on('load', async () => {
        // We fetch the JSON here so that we can parse and use it separately
        // from GL JS's use in the added source.
        const response = await fetch(
            'http://www.ayudaparamiweb.com/data/experiments/historia/hike.geojson'
        );
        const data = await response.json();
        // save full coordinate list for later
        const coordinates = data.features[0].geometry.coordinates;

        // start by showing just the first coordinate
        data.features[0].geometry.coordinates = [coordinates[0]];

        // add it to the map
        map.addSource('trace', { type: 'geojson', data: data });
        map.addLayer({
            'id': 'trace',
            'type': 'line',
            'source': 'trace',
            'paint': {
                'line-color': 'yellow',
                'line-opacity': 0.75,
                'line-width': 5
            }
        });

        // setup the viewport
        map.jumpTo({ 'center': coordinates[0], 'zoom': 12 });
        map.setPitch(30);

        // on a regular basis, add more coordinates from the saved list and update the map
        let i = 0;
        const timer = setInterval(() => {
            if (i < coordinates.length) {
                data.features[0].geometry.coordinates.push(coordinates[i]);
                map.getSource('trace').setData(data);
                map.panTo(coordinates[i]);
                i++;
            } else {
                window.clearInterval(timer);
            }
        }, 10);
    });
