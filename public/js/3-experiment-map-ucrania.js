     mapboxgl.accessToken = 'pk.eyJ1Ijoic3VjZW5kbyIsImEiOiJja3dvd243c3EwNzFhMm5sY3BycXZocXB6In0.JzhjXlVPZEUl_lr4mBw8zw';
    const map = new mapboxgl.Map({
        container: 'map',
        center: [31.597998528844894, 48.837209748314],
        zoom: 5,
        pitch: 50,
        bearing: 0,
        style: 'mapbox://styles/mapbox/outdoors-v11'
    });

    map.on('load', () => {
        map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

        // add a sky layer that will show when the map is highly pitched
        map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
        'sky-type': 'atmosphere',
        'sky-atmosphere-sun': [0.0, 0.0],
        'sky-atmosphere-sun-intensity': 15
        }
        });
      
      map.addLayer({
'id': '3d-buildings',
'source': 'composite',
'source-layer': 'building',
'filter': ['==', 'extrude', 'true'],
'type': 'fill-extrusion',
'minzoom': 15,
'paint': {
'fill-extrusion-color': '#aaa',
 
// use an 'interpolate' expression to add a smooth transition effect to the
// buildings as the user zooms in
'fill-extrusion-height': [
'interpolate',
['linear'],
['zoom'],
15,
0,
15.05,
['get', 'height']
],
'fill-extrusion-base': [
'interpolate',
['linear'],
['zoom'],
15,
0,
15.05,
['get', 'min_height']
],
'fill-extrusion-opacity': 0.6
}
});

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
                                    [29.3383926, 51.3746749], 
                                    [29.283461, 51.2304315], 
                                    [29.5361465, 50.9336603], 
                                    [29.8108047, 50.7532929], 
                                    [30.0305313, 50.6558831], 
                                    [30.1277499, 50.6110642], 
                                    [30.1589923, 50.5907983], 
                                    [30.2029376, 50.571832], 
                                    [30.2623325, 50.5737944], 
                                    [30.2932315, 50.5842591], 
                                    [30.352283, 50.6247878], 
                                    [30.4130512, 50.6607115], 
                                    [30.4673221, 50.6832177], 
                                    [30.4886081, 50.7857804], 
                                    [30.5071475, 50.8486843], 
                                    [30.5339267, 50.8842201], 
                                    [30.5531528, 50.9076068], 
                                    [30.6369235, 50.9136682], 
                                    [30.7646396, 50.9802907], 
                                    [30.9843661, 51.0010366], 
                                    [31.2700107, 50.9941223], 
                                    [31.5336825, 51.0839276], 
                                    [31.6984775, 51.1838898], 
                                    [31.8193271, 51.3831654], 
                                    [31.951163, 51.6259302], 
                                    [31.8962314, 51.7791261], 
                                    [31.7643954, 51.9182533], 
                                    [31.9236972, 51.9859642], 
                                    [32.0445468, 52.0501949], 
                                    [31.8962314, 52.0535729], 
                                    [31.9566562, 52.0873389], 
                                    [31.8742587, 52.1177065], 
                                    [31.8083407, 52.1177065], 
                                    [31.649039, 52.1075863], 
                                    [31.3853671, 52.1446826], 
                                    [31.313956, 52.0940891], 
                                    [31.2645175, 52.0434381], 
                                    [31.1381747, 52.0974638], 
                                    [30.9569003, 52.0805878], 
                                    [30.9184482, 52.002876], 
                                    [30.8250644, 51.9555069], 
                                    [30.8140781, 51.9046988], 
                                    [30.7371738, 51.8979201], 
                                    [30.6657626, 51.8266813], 
                                    [30.6218173, 51.7213131], 
                                    [30.5504062, 51.6872708], 
                                    [30.511954, 51.6361594], 
                                    [30.5394198, 51.5884034], 
                                    [30.5723788, 51.526929], 
                                    [30.5998447, 51.4311369], 
                                    [30.64379, 51.3660205], 
                                    [30.5998447, 51.3076799], 
                                    [30.544913, 51.2664535], 
                                    [30.4350497, 51.2836357], 
                                    [30.4680087, 51.3179807], 
                                    [30.3196933, 51.3660205], 
                                    [30.3581454, 51.4105838], 
                                    [30.176871, 51.5166752], 
                                    [30.1109531, 51.5029998], 
                                    [29.9955966, 51.4995803], 
                                    [29.8857333, 51.4824791], 
                                    [29.8582675, 51.4379858], 
                                    [29.7264316, 51.4653714], 
                                    [29.7429111, 51.5371805], 
                                    [29.6110751, 51.4961606], 
                                    [29.5671298, 51.4619491], 
                                    [29.5121982, 51.4824791], 
                                    [29.5012118, 51.4003038], 
                                    [29.4133212, 51.4174359], 
                                    [29.3383926, 51.3746749]
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
                                    [35.9941991, 49.9466507], 
                                    [36.3732274, 49.8971373], 
                                    [36.592954, 49.7553902], 
                                    [37.0543798, 49.8511151], 
                                    [37.3949559, 49.8723616], 
                                    [37.8508886, 49.7837729], 
                                    [37.8838475, 49.4527975], 
                                    [38.1694921, 49.2560008], 
                                    [38.1200536, 48.9719506], 
                                    [38.4386571, 48.660881], 
                                    [38.2903417, 48.4208432], 
                                    [37.8399022, 48.296743], 
                                    [37.5597509, 48.0402902], 
                                    [37.5542577, 47.7862454], 
                                    [37.3015721, 47.5902622], 
                                    [36.9225438, 47.3340105], 
                                    [37.0269139, 47.0016375], 
                                    [37.0269139, 46.8816242], 
                                    [37.2411473, 46.9416645], 
                                    [37.3015721, 46.8853787], 
                                    [37.4553807, 47.0353428], 
                                    [37.3015721, 47.199818], 
                                    [37.565244, 47.2595011], 
                                    [37.6806005, 47.0765093], 
                                    [38.0541356, 47.1213819], 
                                    [38.1475194, 47.0540588], 
                                    [38.2409032, 47.1251196], 
                                    [38.2299169, 47.2147451], 
                                    [38.334287, 47.3004943], 
                                    [38.2134374, 47.319117], 
                                    [38.2848485, 47.4046972], 
                                    [38.2793554, 47.6013753], 
                                    [38.7407811, 47.6827989], 
                                    [38.8616307, 47.8526382], 
                                    [39.740537, 47.8378915], 
                                    [39.8174413, 48.0292707], 
                                    [40.0371679, 48.2199418], 
                                    [39.8613866, 48.5846288], 
                                    [39.674619, 48.6282156], 
                                    [39.806455, 48.8166571], 
                                    [39.9492772, 48.8094224], 
                                    [40.0371679, 48.8961698], 
                                    [39.7515233, 48.9611318], 
                                    [39.6965917, 49.0332127], 
                                    [39.9932225, 49.1123812], 
                                    [40.2459081, 49.2631709], 
                                    [40.0481542, 49.4777879], 
                                    [40.1580175, 49.5918673], 
                                    [39.8284276, 49.5633724], 
                                    [39.6196874, 49.7340923], 
                                    [39.3560155, 49.7695836], 
                                    [39.1692479, 49.8759018], 
                                    [38.9165624, 49.8404883], 
                                    [38.5320409, 49.9819863], 
                                    [38.367246, 50.0525797], 
                                    [38.1804784, 50.0878374], 
                                    [38.2134374, 49.9890503], 
                                    [38.0925878, 49.9325092], 
                                    [37.7849706, 50.080788], 
                                    [37.631162, 50.2988401], 
                                    [37.3455175, 50.4249943], 
                                    [36.8181737, 50.3128738], 
                                    [36.6533788, 50.1934553], 
                                    [36.5764745, 50.2918217], 
                                    [36.3128026, 50.2848022], 
                                    [36.1809667, 50.4459874], 
                                    [35.7964452, 50.396989], 
                                    [35.6206639, 50.3619591], 
                                    [35.6865819, 50.0878374], 
                                    [35.9941991, 49.9466507]
                                ]
                            ]
                        }
                    },
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [36.23277841842557, 49.98872794792197]
                        }
                    },
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [36.820290276031166, 49.9210829459584]
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
