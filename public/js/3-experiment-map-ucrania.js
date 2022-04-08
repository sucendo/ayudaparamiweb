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
        'sky-atmosphere-sun': [0.1, 0.1],
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
	
	// Add imagen Gostomel Airport (Ataque)
	map.addSource('2022-02-26-sentinel', {
            'type': 'image',
            'url': './img/experiments/sentinel/2022-02-26-00_00_2022-02-26-23_59_Sentinel-2_L1C_Wildfires.jpg',
            'coordinates': [
                [30.15644, 50.60863],
                [30.23086, 50.60863],
                [30.23060, 50.58258],
                [30.15644, 50.58258]
            ]
        });
	map.addLayer({
            id: 'sentinel-layer',
            'type': 'raster',
            'source': '2022-02-26-sentinel',
            'paint': {
                'raster-fade-duration': 0
            }
        });
	 
	// Add imagen Batalla por Irpin  
	map.addSource('2022-03-23-sentinel', {
            'type': 'image',
            'url': './img/experiments/sentinel/2022-03-23-00_00_2022-03-23-23_59_Sentinel-2_L1C_Wildfires.jpg',
            'coordinates': [
                [30.20597, 50.54164],
                [30.30244, 50.54164],
                [30.30244, 50.50862],
                [30.20597, 50.50862]
            ]
        });
	map.addLayer({
            id: 'sentinel-23-layer',
            'type': 'raster',
            'source': '2022-03-23-sentinel',
            'paint': {
                'raster-fade-duration': 0
            }
        });    
	    
	// Add imagen Batalla por Mariupol  
	map.addSource('2022-03-29-sentinel', {
            'type': 'image',
            'url': './img/experiments/sentinel/2022-03-29-00_00_2022-03-29-23_59_Sentinel-2_L1C_Wildfires.jpg',
            'coordinates': [
                [37.54088, 47.09660],
                [37.57054, 47.09660],
                [37.57054, 47.08222],
                [37.54088, 47.08222]
            ]
        });
	map.addLayer({
            id: 'sentinel-29-layer',
            'type': 'raster',
            'source': '2022-03-29-sentinel',
            'paint': {
                'raster-fade-duration': 0
            }
        });        
	    
	map.addSource('radar', {
            'type': 'image',
            'url': 'https://media.urgente24.com/p/805a75793838e06ba6a508e07b9f4c99/adjuntos/319/imagenes/002/658/0002658006/el-nyt-analiza-imagenes-satelitales-bucha-maxar.png',
            'coordinates': [
                [30.229524679357173, 50.54200556673879],
                [30.230685158164373, 50.54238271980543],
                [30.23117886961314, 50.541811862489766],
                [30.229928850107232, 50.541393494071635]
            ]
        });
	map.addLayer({
            id: 'radar-layer',
            'type': 'raster',
            'source': 'radar',
            'paint': {
                'raster-fade-duration': 0
            }
        });    

        map.addSource('war-ucraine-red', {
            'type': 'geojson',
	    // Use a URL for the value for the `data` property.	
            'data': 'http://www.ayudaparamiweb.com/data/experiments/3-mapa-guerra-ucrania-rusia/war-ucraine-red.geojson'
        });
        map.addLayer({
            'id': 'park-ucraine-red-layer',
            'type': 'fill',
            'source': 'war-ucraine-red',
            'paint': {
                'fill-color': '#B32428',
                'fill-opacity': 0.2
            },
            'filter': ['==', '$type', 'Polygon']
        });
	     
	map.addSource('war-ucraine-blue', {
            'type': 'geojson',
	    // Use a URL for the value for the `data` property.	
            'data': 'http://www.ayudaparamiweb.com/data/experiments/3-mapa-guerra-ucrania-rusia/war-ucraine-blue.geojson'
        });		
	map.addLayer({
            'id': 'war-ucraine-blue-layer',
            'type': 'fill',
            'source': 'war-ucraine-blue',
            'paint': {
                'fill-color': '#005abb',
                'fill-opacity': 0.05
            },
            'filter': ['==', '$type', 'Polygon']
        });
      
      const geojson = 'http://www.ayudaparamiweb.com/data/experiments/3-mapa-guerra-ucrania-rusia/war-ucraine-events.geojson';
      
       // Add markers to the map.
    for (const marker of geojson.features) {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
        var width = marker.properties.iconSize[0];
        var height = marker.properties.iconSize[1];
        const icon = marker.properties.icon;
        el.className = 'marker';
        el.style.backgroundImage = `url(${icon})`;
        
        // Tamaño iconos tiempo
        const fechaEvento = marker.properties.date;
        const f = Date.now();

        var fEvento = fechaEvento.replace('/', "-");
        fEvento = fEvento.replace('/', "-");
        fEvento = fEvento.replace(/^(\d{2})-(\d{2})-(\d{4})$/g,'$2/$1/$3');
        var day1 = new Date(fEvento); 
        var day2 = new Date(f);

        var difference= Math.abs(day2-day1);
        var days = difference/(1000 * 3600 * 24)
        
        days = days * 3;
        if (days > 14) {
            width = Math.abs(width-30);
            height = Math.abs(height-30);
        } else if (days > 7) {  
            width = Math.abs(width-20);
            height = Math.abs(height-20);
        } else {  
            width = Math.abs(width-days);
            height = Math.abs(height-days);
        };
        
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';
        
        // create the popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<time class="ct-subline__pubtime">${marker.properties.date} a las ${marker.properties.time}h<time>` + marker.properties.description
        );

        // Add markers to the map.
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(popup) // sets a popup on this marker
            .addTo(map);
    }
});
