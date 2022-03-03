    mapboxgl.accessToken = 'pk.eyJ1Ijoic3VjZW5kbyIsImEiOiJja3dvd243c3EwNzFhMm5sY3BycXZocXB6In0.JzhjXlVPZEUl_lr4mBw8zw';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [30.990291823008818, 49.22516351743668],
        zoom: 5
    });

    map.on('load', () => {
        map.addSource('national-park', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': [
                                [
                                    [30.258364199779855, 50.70195834929412],
                                    [29.668364199779855, 50.78195834929412],
                                    [29.088364199779855, 51.49195834929412],
                                    [29.688364199779855, 51.49195834929412],
                                    [30.028364199779855, 51.49195834929412],
                                    [31.058364199779855, 52.05195834929412],
                                    [31.858364199779855, 52.05195834929412],
                                    [30.788364199779855, 50.78195834929412],
                                    [30.458364199779855, 50.75195834929412]
                                ]
                            ]
                        }
                    },
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [30.193004876077445, 50.60402783716925]
                        }
                    },
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [30.525051068781647, 50.44968568335718]
                        }
                    },
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [30.254364199779855, 50.79795834929412]
                        }
                    },
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [29.897815533668712, 50.9210829459584]
                        }
                    },
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': [
                                [
                                    [34.820290276031166, 50.399945840256656],
                                    [35.09668292604193, 51.09034884176761],
                                    [35.59668292604193, 50.49034884176761],
                                    [40.12670167111091, 49.57066172026843],
                                    [38.12670167111091, 47.57066172026843],
                                    [36.12670167111091, 46.77066172026843],
                                    [37.12670167111091, 49.77066172026843]
                                ]
                            ]
                        }
                    },
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [35.820290276031166, 49.9210829459584]
                        }
                    }
                ]
            }
        });

        map.addLayer({
            'id': 'park-boundary',
            'type': 'fill',
            'source': 'national-park',
            'paint': {
                'fill-color': '#888888',
                'fill-opacity': 0.4
            },
            'filter': ['==', '$type', 'Polygon']
        });

        map.addLayer({
            'id': 'park-volcanoes',
            'type': 'circle',
            'source': 'national-park',
            'paint': {
                'circle-radius': 6,
                'circle-color': '#B42222'
            },
            'filter': ['==', '$type', 'Point']
        });
    });
