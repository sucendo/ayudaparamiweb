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
	    
	// Add imagen Batalla por Mariupol  
	map.addSource('2022-04-23-sentinel', {
            'type': 'image',
            'url': './img/experiments/sentinel/2022-04-23-00_00_2022-04-23-23_59_Sentinel-2_L1C_Wildfires.png',
            'coordinates': [
                [48.94293, 37.24453],
                [48.93488, 37.24453],
                [48.93488, 37.26528],
                [48.94293, 37.26528]
            ]
        });
	map.addLayer({
            id: 'sentinel-20220423-layer',
            'type': 'raster',
            'source': '2022-04-23-sentinel',
            'paint': {
                'raster-fade-duration': 0
            }
        });   
	
	// Add imagen Batalla por Mariupol  
	map.addSource('2022-04-23-sentinel-2', {
            'type': 'image',
            'url': './img/experiments/sentinel/2022-04-23-00_00_2022-04-23-23_59_Sentinel-2_L1C_Wildfires-2.png',
            'coordinates': [
                [49.17615, 37.01311],
		[49.14399, 37.01311],
		[49.14399, 37.09611],
		[49.17615, 37.09611]
            ]
        });
	map.addLayer({
            id: 'sentinel-20220423-2-layer',
            'type': 'raster',
            'source': '2022-04-23-sentinel-2',
            'paint': {
                'raster-fade-duration': 0
            }
        });
	    
	// Add imagen Batalla por Mariupol  
	map.addSource('2022-04-23-sentinel-3', {
            'type': 'image',
            'url': './img/experiments/sentinel/2022-04-23-00_00_2022-04-23-23_59_Sentinel-2_L1C_Wildfires-3.png',
            'coordinates': [
                [49.02262, 37.29592],
		[48.99047, 37.29592],
		[48.99047, 37.37866],
		[49.02262, 37.37866],
            ]
        });
	map.addLayer({
            id: 'sentinel-20220423-3-layer',
            'type': 'raster',
            'source': '2022-04-23-sentinel-3',
            'paint': {
                'raster-fade-duration': 0
            }
        });
	    
	// Add imagen Batalla por Mariupol  
	map.addSource('2022-04-23-sentinel-4', {
            'type': 'image',
            'url': './img/experiments/sentinel/2022-04-23-00_00_2022-04-23-23_59_Sentinel-2_L1C_Wildfires-4.png',
            'coordinates': [
		[48.63114, 38.36960],
		[48.62301, 38.36960],
		[48.62301, 38.39031],
		[48.63114, 38.39031]
            ]
        });
	map.addLayer({
            id: 'sentinel-20220423-4-layer',
            'type': 'raster',
            'source': '2022-04-23-sentinel-4',
            'paint': {
                'raster-fade-duration': 0
            }
        });    
	    
	// Add imagen Batalla por Mariupol  
	map.addSource('2022-04-26-sentinel', {
            'type': 'image',
            'url': './img/experiments/sentinel/2022-04-26-00_00_2022-04-26-23_59_Sentinel-2_L1C_Wildfires.png',
            'coordinates': [
		[47.83776, 36.78137],
		[47.78894, 36.78137],
		[47.78894, 36.86093],
		[47.83776, 36.86093]
            ]
        });
	map.addLayer({
            id: 'sentinel-20220426-layer',
            'type': 'raster',
            'source': '2022-04-26-sentinel',
            'paint': {
                'raster-fade-duration': 0
            }
        });   

    // Add imagen Incencios Rio Donest  
    map.addSource('2022-05-11-sentinel', {
            'type': 'image',
            'url': './img/experiments/sentinel/2022-05-11-00_00_2022-05-11-23_59_Sentinel-2_L2A_Wildfires_49.36617-36.97037_49.29278-37.20434.jpg',
            'coordinates': [
        [49.36617, 36.97037],
        [49.29278, 36.97037],
        [49.29278, 37.20434],
        [49.36617, 37.20434]
            ]
        });
    map.addLayer({
            id: 'sentinel-20220511-layer',
            'type': 'raster',
            'source': '2022-05-11-sentinel',
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
      
	    
	/*map.addSource('war-ucraine-events', {
            'type': 'geojson',
	    // Use a URL for the value for the `data` property.	
            'data': 'http://www.ayudaparamiweb.com/data/experiments/3-mapa-guerra-ucrania-rusia/war-ucraine-events.geojson'
        });*/
	    
      const geojson = {
        'type': 'FeatureCollection',
        'features': [
	      {
                'type': 'Feature',
                'properties': {
                    'message': 'Destruido el puente de Vyshgorod',
                    'date':'25/02/2022',
                    'time':'11:34',
                    'description': '<h3>Destruido el puente de Vyshgorod</h3>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/explosion-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.23510996432313, 50.44684315428579]
                }
            },
	        {
                'type': 'Feature',
                'properties': {
                    'message': 'Imagen Satelite de las consecuencias del ataque al Aeropuerto de Gostomel (24/02/2022)',
                    'date':'26/02/2022',
                    'time':'8:39',
                    'description': '<h3>Imagen Satelite de las consecuencias del ataque al Aeropuerto de Gostomel (24/02/2022)</h3>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/satelite-white.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.15644, 50.60863]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Volado el puente de la autopista M-06 Kiev-Zhytomir cerca de Stoyanka',
                    'date':'26/02/2022',
                    'time':'8:39',
                    'description': '<h3>Volado el puente de la autopista M-06 Kiev-Zhytomir cerca de Stoyanka</h3>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/explosion-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.23510996432313, 50.44684315428579]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'message': 'Volado el puente Bucha-Irpin',
                    'date':'27/02/2022',
                    'time':'8:30',
                    'description': '<h3>Volado el puente Bucha-Irpin</h3><p>El puente Bucha-Irpin ha sido volado para frenar el avance ruso hacia Kiev</p><img src="https://pbs.twimg.com/media/FMlj1OvX0AUQwOp?format=jpg&name=large"/>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/explosion-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.231617467501735, 50.53795853872888]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Enorme convoy Ruso dirigiendose a Kiev en Ivankiv',
                    'date':'01/03/2022',
                    'time':'10:30',
                    'description': '<h3>Enorme convoy Ruso dirigiendose a Kiev en Ivankiv</h3><p>El convoy Ruso que se dirige hacia Kiev tiene una longitud de 64kms.</p><img src="https://imagenes.heraldo.es/files/image_990_v1/uploads/imagenes/2022/03/01/satellite-overviews-around-ivankiv-ukraine.jpeg"/>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/blindado-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [29.89777845858527, 50.92103138498985]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Las tropas rusas capturan Kashpero-Mykolaivka',
                    'date':'06/03/2022',
                    'time':'23:35',
                    'description': '<h3>Las tropas rusas capturan Kashpero-Mykolaivka</h3><p>Las tropas rusas capturan Kashpero-Mykolaivka en la región de Mykolaiv</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [32.18224284461808, 47.37120126219106]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Bombadeo Ucraniano a posiciones Rusas',
                    'date':'06/03/2022',
                    'time':'23:38',
                    'description': '<h3>Bombadeo Ucraniano a posiciones Rusas</h3><p>Las Fuerzas Armadas de Ucranianas bombardean posiciones de concentración de tropas rusas en Novaya Basana y Skripali, el ejército ruso sufre pérdidas significativas, redistribuyendo fuerzas adicionales para reponerlo.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [31.503806052076275, 50.56732420269373]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Blindados Ocultos en Irpin',
                    'date':'07/03/2022',
                    'time':'10:15',
                    'description': '<h3>Blindados en Irpin</h3><p>Los ejército Ruso oculta sus vehículos blindados en un complejo residencial de Irpin, a las afueras de Kiev</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/blindado-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.223759100750442, 50.52287759050594]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Edificio residencial atacado en Zabuchhia',
                    'date':'07/03/2022',
                    'time':'19:38',
                    'description': '<h3>Edificio residencial atacado en Zabuchhia</h3><p>El ejército Ruso ha disparado a un edificio Residencial en Zabuchhia, a las afueras de Kiev</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/explosion-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.169928937247896, 50.49561041694798]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Explosiones en Odesa',
                    'date':'07/03/2022',
                    'time':'21:58',
                    'description': '<h3>Explosiones en Odesa</h3><p>Aún no se sabe la causa, posible bombardeo marítimo</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/explosion-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.691249923655178, 46.49410123392493]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Ataques aéreos en la región de Sumy',
                    'date':'08/03/2022',
                    'time':'3:30',
                    'description': '<h3>Ataques aéreos en la región de Sumy</h3><p>Esta pasada noche el ejército ruso realiza un bombardeo en la ciudad de Sumy, varias viviendas son destruidas.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [34.47, 50.54]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Bombardeo en Sumy',
                    'date':'08/03/2022',
                    'time':'5:30',
                    'description': '<h3>Bombardeo en Sumy</h3><p>Un proyectil alcanza un edificio residencial. El impacto destruye varias viviendas. Hay al menos diez muertos y varios heridos, entre las víctimas niños.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [34.761078335687664, 50.89530308657344]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Foo',
                    'date':'08/03/2022',
                    'time':'8:20',
                    'description': '<h3>Bombardeo en Chuhuiv</h3><p> Un cohete BM-30 "Smerch" cae sin llegar a explotar</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.41, 49.50]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Avión Derribado',
                    'date':'08/03/2022',
                    'time':'9:10',
                    'description': '<h3>Bombardeo en las afueras de Kiev</h3><p> Las tropas rusas bombardean aldeas y autobuses de evacuación en la región de Kiev. 3 heridos.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.403020611337467, 50.662688384517715]
                }
           },
		   {
                'type': 'Feature',
                'properties': {
                    'message': 'Avión Derribado',
                    'date':'08/03/2022',
                    'time':'9:50',
                    'description': '<h3>Avión derribado en Bilozerka</h3><p>La aeronave expulsa a sus pilotos antes de caer derribado en la región de Kherson</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/avion-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [32.44868043344817, 46.62674617568507]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Proyectil Impacta en Hryhorivka',
                    'date':'08/03/2022',
                    'time':'15:52',
                    'description': '<h3>Proyectil Impacta en Hryhorivka</h3><p>Un proyectil impacta cerca de una escuela en Hryhorivka, del distrito de Vasylkiv en la región de Dnipropetrovsk</p><img src="https://pbs.twimg.com/media/FNVdrX6XIAEPTp8?format=jpg&name=medium"/>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.11611261969156, 48.11273609382977]
                }
            },
			 {
                'type': 'Feature',
                'properties': {
                    'message': 'El Estado Mayor de Ucrania informa:',
                    'date':'09/03/2022',
                    'time':'0:00',
                    'description': '<h3>El Estado Mayor de Ucrania informa</h3><p>En la región de Kiev, las tropas rusas intentaron moverse desde Buzova hacia Yasnohorodka. Batalla por la ciudad de Izyum. Batallas en Chernihiv, regiones de Sumy. Las tropas rusas capturaron la ciudad de Polohy en la región de Zaporizhiye</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.25539009284283, 47.47784139696324]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Pentágono sobre Propuesta Aviones Polacos',
                    'date':'09/03/2022',
                    'time':'8:30',
                    'description': '<h3>Pentágono sobre Propuesta Aviones Polacos</h3><p>Respuesta del Pentágono a la propuesta de Polonia sobre aviones: "Continuaremos consultando con Polonia y nuestros otros aliados de la OTAN sobre este tema y los difíciles desafíos logísticos que presenta, pero no creemos que la propuesta de Polonia sea sostenible".</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/avion-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-77.0559021542296, 38.87084604327927]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Los voluntarios extranjeros podrán obtener la ciudadanía ucraniana',
                    'date':'09/03/2022',
                    'time':'8:30',
                    'description': '<h3>Los voluntarios extranjeros podrán obtener la ciudadanía ucraniana</h3><p>Siempre que así lo desesen, dijo el 9 de marzo el primer viceministro del Interior, Yevhen Yenin. Veinte mil voluntarios extranjeros se han unido a las fuerzas ucranianas para luchar contra Rusia desde el 6 de marzo.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/declaracion-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.536978484276492, 50.44730950118309]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Incendio en un edificio residencial del distrito',
                    'date':'09/03/2022',
                    'time':'8:30',
                    'description': '<h3>Incendio en un edificio residencial del distrito de Saltivka</h3><p> en Kharkiv después del bombardeo del ejército ruso.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.353141553874536, 50.04206652441891]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Declaraciones del vicecanciller de Polonia',
                    'date':'09/03/2022',
                    'time':'8:30',
                    'description': '<h3>Declaraciones del vicecanciller de Polonia</h3><p>sobre el rechazo del Pentágono a la propuesta polaca de transferir aviones MiG29; no puede ser que Polonia sea el único país de la OTAN que asuma el riesgo, y otros países no tendrían que compensar o compartir esto de ninguna manera, continuaremos las conversaciones con los aliados</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/avion-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [21.016853162357737, 52.24298829038197]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'La IAEA sobre el personal nuclear',
                    'date':'09/03/2022',
                    'time':'8:02',
                    'description': '<h3>La IAEA sobre el personal nuclear</h3><p>La IAEA dice que es cada vez más urgente e importante permitir la rotación del personal en los sitios nucleares en UA - Chernobyl y Zhaporizhzhya. Los de Chernobyl no lo han hecho durante 2 semanas y hay informes de que los de Zhaporizhzhya están siendo torturados.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/nuclear-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.10988615412782, 51.38891282181196]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Explosiones en Járkov (Kharkiv)',
                    'date':'09/03/2022',
                    'time':'8:30',
                    'description': '<h3>Explosiones en Járkov (Kharkiv)</h3><p>Se escuchan explosiones en Kharkiv, quédense en los refugios</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.2712202511565, 50.05312305527623]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Convoy ruso destruido',
                    'date':'09/03/2022',
                    'time':'8:30',
                    'description': '<h3>Convoy ruso destruido</h3><p>Gran convoy militar ruso destruido cerca de Járkov (Kharkiv)</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/explosion-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.26565753405639, 50.122959094585454]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Evacuación de las poblaciones de Bucha, Vorzel, Hostomiel y Borodyanka',
                    'date':'09/03/2022',
                    'time':'9:26',
                    'description': '<h3>Evacuación de las poblaciones de Bucha, Vorzel, Hostomiel y Borodyanka</h3>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bus-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.170598, 50.547667]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Tropas rusas en Skadovsk',
                    'date':'09/03/2022',
                    'time':'9:27',
                    'description': '<h3>Tropas rusas en Skadovsk</h3><p>Trupas rusas formadas en Skadovsk en la región de Kherson.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [32.905641, 46.109382]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Suenan las sirenas en Járkov',
                    'date':'09/03/2022',
                    'time':'10:27',
                    'description': '<h3>Suenan las sirenas en Járkov</h3><p>Amenaza aérea. Sirenas sonando. ¡Peligro!</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/sirena-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.2305, 49.98826817621031]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Pérdida de energía en la planta de energía nuclear de Chernobyl',
                    'date':'09/03/2022',
                    'time':'10:32',
                    'description': '<h3>Ucrania ha informado a la OIEA de la pérdida de energía en la planta de energía nuclear de Chernobyl<h3><p> dice que el desarrollo viola un pilar clave de seguridad para garantizar un suministro de energía ininterrumpido; en este caso, el OIEA no ve un impacto crítico en la seguridad</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/apagon-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.01588615412782, 51.38891282181196]
                }
            }, 
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Suenan las sirenas en Kiev',
                    'date':'09/03/2022',
                    'time':'10:32',
                    'description': '<h3>Suenan las sirenas en Kiev</h3><p>Amenaza aérea. Sirenas sonando. ¡Peligro!</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/sirena-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.522261190967264, 50.448167534381774]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Columna rusa destruida, camino a Brovary',
                    'date':'09/03/2022',
                    'time':'11:45',
                    'description': '<h3>Columna rusa destruida, camino a Brovary</h3><p>La columna rusa en el camino a Brovary fue destruida cerca de los pueblos de Velyka Dymerka, Bohdanivka, Rudnya. El Servicio de Seguridad de Ucrania pide a los ciudadanos que informen sobre los soldados rusos que huyeron a las zonas cercanas</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.8453, 50.5920]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Suenan explosiones en el Norte de Kiev',
                    'date':'09/03/2022',
                    'time':'12:04',
                    'description': '<h3>Suenan explosiones en el Norte de Kiev</h3>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/antiaerea-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.59333752009986, 50.537224721903115]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Violación del Alto el Fuego en Izyum',
                    'date':'09/03/2022',
                    'time':'12:11',
                    'description': '<h3>Violación del Alto el Fuego en Izyum</h3><p>El ejército ruso viola el alto el fuego e impide la evacuación de Izyum</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [37.27887172533673, 49.165806677056025]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Bombardeo en Novoluhanske',
                    'date':'09/03/2022',
                    'time':'12:11',
                    'description': '<h3>Las tropas rusas bombardean Novoluhanske</h3><p>con morteros, sin víctimas, daños materiales</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/mortero-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [38.173898912333755, 48.42611762039795]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Columna de caminiones sospechosos Rusos',
                    'date':'09/03/2022',
                    'time':'13:03',
                    'description': '<h3>Columna de caminiones sospechosos Rusos</h3><p>Una columna de 7 camiones militares KamAZ de las Fuerzas Armadas rusas con marcas de identificación "V" y letreros "Inflamable" se movía a lo largo de la carretera R-149 desde Zhlobin hacia Svetlahorsk. Llama la atención que los vehículos no contaban con placas</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/camion-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [29.951821356724246, 52.89207506805303]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Fuerzas armadas rusas entran en Melitopol',
                    'date':'09/03/2022',
                    'time':'13:16',
                    'description': '<h3>Fuerzas armadas rusas entran en Melitopol</h3>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [35.44848253828134, 46.83019300919504]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Gran convoy Ruso en Melitopol',
                    'date':'09/03/2022',
                    'time':'14:49',
                    'description': '<h3>Gran convoy militar Ruso en Melitopol</h3>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/blindado-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [35.29414363025558, 46.82785540853719]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Manifestación en Melitopol por la Ocupación Rusa',
                    'date':'09/03/2022',
                    'time':'15:10',
                    'description': '<h3>Manifestación en Melitopol por la Ocupación Rusa</h3>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/manifestacion-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [35.36040492162686,46.83865967175554]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Sirenas suenan en Bila Tserkva',
                    'date':'09/03/2022',
                    'time':'15:49',
                    'description': '<h3>Sirenas suenan en Bila Tserkva, Vasylkiv, Myronivka</h3><p>Alerta Roja: amenaza aérea. Sirenas sonando. ¡Cúbrete ahora!</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/sirena-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.12806756667516, 49.79686954023688]
                }
            }, 
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Suenan las sirenas en Kiev',
                    'date':'09/03/2022',
                    'time':'15:50',
                    'description': '<h3>Sirenas suenan en Kiev</h3> Alerta Roja: amenaza aérea. Sirenas sonando. ¡Cúbrete ahora!</h3>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/sirena-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.523261190967264, 50.444167534381774]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Bombardeado el Hospital materno de Mariupol',
                    'date':'09/03/2022',
                    'time':'15:42',
                    'description': '<h3>Bombardeado el Hospital materno de Mariupol</h3><p>Durante la tregua el ejército Ruso bombardea con ataques aéreos el Hospital materno de la ciudad de Mariupol</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [37.53247701477742, 47.09576545826169]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Bombardeado el puente de Berdychiv en Zhymtomyr',
                    'date':'09/03/2022',
                    'time':'21:15',
                    'description': '<h3>Bombardeado el puente de Berdychiv en Zhymtomyr</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [28.679126013051047, 50.238964590735954]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Bombardeada la población de Piskivka',
                    'date':'09/03/2022',
                    'time':'21:15',
                    'description': '<h3>Bombardeada la población de Piskivka</h3><p>El resultado del bombardeo efectuado sobre la población de Piskivka, es de un muerto, dos heridos y 9 edificios destruidos.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [29.598238757136954, 50.69670772993184]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'La fuerzas Ucranianas repelen un ataque a Brovary',
                    'date':'10/03/2022',
                    'time':'07:30',
                    'description': '<h3>La fuerzas Ucranianas repelen un ataque a Brovary</h3>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/antitanque-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.829588970807926, 50.57475443658947]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Sirenas Suenan en Sumy',
                    'date':'10/03/2022',
                    'time':'09:08',
                    'description': '<h3>Sirenas Suenan en Sumy</h3><p>Alerta! Bombardeos aéreos Rusos en Sumy.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/sirena-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [34.80457729855631, 50.91335730943844]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Sirenas Suenan en Járkov',
                    'date':'10/03/2022',
                    'time':'09:34',
                    'description': '<h3>Sirenas Suenan en Járkov</h3><p>Alerta! Bombardeos aéreos Rusos en Járkov.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/sirena-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.232750598665, 49.9870791076946]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Sirenas Suenan en Dnipro',
                    'date':'10/03/2022',
                    'time':'09:34',
                    'description': '<h3>Sirenas Suenan en Dnipro</h3><p>Alerta! Bombardeos aéreos Rusos en Dnipro.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/sirena-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [35.04056632917259, 48.46742005229823]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Korosten Bombardeado',
                    'date':'10/03/2022',
                    'time':'09:47',
                    'description': '<h3>Korosten Bombardeado</h3><p>El bombardeo nocturo, tuvo como consecuencia un muerto y varios heridos graves.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [28.649952135961392, 50.9555714487725]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Suenan las sirenas en Chernihiv',
                    'date':'10/03/2022',
                    'time':'10:20',
                    'description': '<h3>Sirenas Suenan en Chernihiv</h3><p>Alerta! Chernihiv esta siendo bombardeada.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/sirena-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [31.29123707303483, 51.496568064549606]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Situación en el frente de Mykolaiv',
                    'date':'10/03/2022',
                    'time':'11:47',
                    'description': '<h3>Situación en el frente de Mykolaiv</h3><p>El Estado Mayor ucraniano informa que en el frente de Mykolaiv, las tropas rusas avanzan e intentan afianzarse en las poblaciones de Oleksandrivka, Burgunka, Bereslav, Tavriyask</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [33.28188168391385, 47.31457711016216]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Bombardeos al noreste de Járkov',
                    'date':'10/03/2022',
                    'time':'12:15',
                    'description': '<h3>Bombardeos al noreste de Járkov</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.31931336281875, 50.024088340862946]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'El ejército ucraniano elimina las tropas rusas en la ciudad de Moshchun',
                    'date':'10/03/2022',
                    'time':'12:56',
                    'description': '<h3>El ejército ucraniano elimina las tropas rusas en la ciudad de Moshchun</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.31792387251741, 50.60402715021165]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Suenan las Sirenas en Járkov',
                    'date':'10/03/2022',
                    'time':'13:07',
                    'description': '<h3>Suenan las Sirenas en Járkov</h3><p>Alerta! Bombardeos en Járkov.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/sirena-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.233750598665, 49.9879791076946]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Rastro de misil en Mazyr',
                    'date':'10/03/2022',
                    'time':'13:54',
                    'description': '<h3>Rastro de misil en Mazyr</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/cohete-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [29.24953114212453, 51.98969936236027]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Barco ruso lanza un proyectil cerca de Odesa',
                    'date':'10/03/2022',
                    'time':'14:06',
                    'description': '<h3>Barco ruso lanza un proyectil cerca de Odesa</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/buque-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.915721783480198, 45.59011353906731]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Ayuda humanitaria llega a Enerhodar',
                    'date':'10/03/2022',
                    'time':'15:29',
                    'description': '<h3>Ayuda humanitaria llega a Enerhodar</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/suministros-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [34.63946114667492, 47.50438893131695]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Minas alrededor de la central nuclear de Zaporizhiya',
                    'date':'10/03/2022',
                    'time':'15:55',
                    'description': '<h3>Minas alrededor de la central nuclear de Zaporizhiya</h3><p>El ejército ruso ha plantado minas en la orilla del depósito de agua de Kahovske junto a la central nuclear de Zaporizhiya</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/minas-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [34.630844517086615, 47.51246344116496]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Tropas rusas dispara en Daryivka',
                    'date':'10/03/2022',
                    'time':'16:15',
                    'description': '<h3>Tropas rusas dispara en Daryivka</h3><p>En la aldea de Daryivka de la región de Kherson, las tropas rusas dispararon contra un automóvil civil y mataron a un conductor.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [32.7827845424767, 46.750334421758716]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Evacuada la ciudad de Korosten',
                    'date':'10/03/2022',
                    'time':'16:21',
                    'description': '<h3>Evacuada la ciudad de Korosten</h3><p>Hasta el 70% de la población ya ha sido evacuada de Korosten</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bus-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [28.647408933017335, 50.95063088356955]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Protesta contra la ocupación rusa en Berdyansk',
                    'date':'10/03/2022',
                    'time':'17:23',
                    'description': '<h3>Protesta contra la ocupación rusa en Berdyansk</h3><p>Protesta pacífica contra la ocupación rusa en Berdyansk, región de Zaporizhiya</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/manifestacion-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.79040903085111, 46.76123092393328]
                }
            },
			{
                'type': 'Feature',
                'properties': {
                    'message': 'Las fuerzas rusas avanzan por las inmediaciones del aeropuerto de Hostomel',
                    'date':'10/03/2022',
                    'time':'21:15',
                    'description': '<h3>Las fuerzas rusas avanzan por las inmediaciones del aeropuerto de Hostomel</h3><p>El ejército ruso avanza 5km y toma posiciones en las cercanias del aeropuerto de Hostomel, ya cerca de los limites de la capital de Ucraniana, Kiev.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/blindado-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.24132017078246, 50.57818026166025]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Dispersado el largo convoy Ruso',
                    'date':'11/03/2022',
                    'time':'00:59',
                    'description': '<h3>Dispersado el largo convoy Ruso</h3><p>La compañía de satélites estadounidense Maxar afirma que han podido detectar que el largo convoy militar ruso que se había estancado a unos kilometros de Kiev ahora se ha "dispersado".</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/blindado-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [29.96929998790423, 50.89415390507775]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Sirenas suenan en Kiev',
                    'date':'11/03/2022',
                    'time':'12:22',
                    'description': '<h3>Sirenas suenan en Kiev</h3> Alerta! amenaza aérea. Sirenas sonando. </h3>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/apagon-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.505863136515025, 50.455531490506615]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Suministro de gas interrumpido en Popasna',
                    'date':'11/03/2022',
                    'time':'13:32',
                    'description': '<h3>Suministro de gas interrumpido en Popasna</h3><p>Suministro de gas interrumpido en Popasna como resultado de bombardeos del ejército ruso</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/apagon-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [38.40001698742611, 48.63109632479285]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Las fuerzas rusas disparan su artilleria desde Trostyanets',
                    'date':'12/03/2022',
                    'time':'09:15',
                    'description': '<h3>Las fuerzas rusas disparan su artilleria desde Trostyanets</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/artilleria-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [34.96571826217886, 50.481097284769845]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Ataque aéreo contra la Base de Yavoriv, en la región de Leópolis',
                    'date':'12/03/2022',
                    'time':'18:50',
                    'description': '<h3>Tanques rusos a las afueras occidentales de Mariupol</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/blindado-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [37.511000246048766, 47.11027408342846]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Ataque aéreo contra la Base de Yavoriv, en la región de Leópolis',
                    'date':'13/03/2022',
                    'time':'06:15',
                    'description': '<h3>Ataque aéreo contra la Base de Yavoriv, en la región de Leópolis.</h3><p>El ejército ruso ha llevado a cabo un ataque aéreo contra el Centro Internacional para el Mantenimiento de la Paz y la Seguridad de Yavoriv. Según datos preliminares, se han disparado 8 misiles. El número de muertos por el ataque ruso es de 35 y 134 heridos.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [23.500370731943796, 50.00513592244891]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Bombardeo a un edificio residencial en el norte de Kiev',
                    'date':'14/03/2022',
                    'time':'07:26',
                    'description': '<h3>Bombardeo a un edificio residencial en el norte de Kiev</h3><p>Al menos dos muertos y 12 heridos como resultado de un bombardeo a un edificio residencial en el norte de Kiev</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.486453205280093, 50.52269613410897]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Bombardeo ruso con objetivo la fábrica de aviones "Antonov" de Kiev',
                    'date':'14/03/2022',
                    'time':'07:29',
                    'description': '<h3>Bombardeo ruso con objetivo la fábrica de aviones "Antonov" de Kiev</h3><p>La planta de aviones de Antonov, en Kiev, ha sido bombardeada por las fuerzas rusas, según han anunciado la alcaldía de la ciudad.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.392666174509916, 50.462220163572354]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Ofensiva rusa cerca de Donetsk',
                    'date':'14/03/2022',
                    'time':'07:50',
                    'description': '<h3>Ofensiva terreste rusa cerca de Donetsk</h3><p>Fuentes Rusas informan de una ofensiva por parte del ejército ruso a las ciudades de Solodke, Stepne, Taramchuk, Slavne y Vodyane</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [37.499348810659626, 47.787347397224536]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Fuertes enfrentamientos reportados cerca de Brovary',
                    'date':'14/03/2022',
                    'time':'08:27',
                    'description': '<h3>Fuertes enfrentamientos reportados cerca de Brovary</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.86508016546705, 50.544559664961874]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Suenan las sirenas antiaereas en Járkov',
                    'date':'14/03/2022',
                    'time':'10:01',
                    'description': '<h3>Suenan las sirenas antiaereas en Járkov</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/sirena-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.23528038743257, 49.98542617885501]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Suenan las sirenas antiaereas en Kiev',
                    'date':'14/03/2022',
                    'time':'10:29',
                    'description': '<h3>Suenan las sirenas antiaereas en Kiev</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/sirena-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.518641868452907, 50.45562758657535]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Un cohete cae al noreste de Kiev',
                    'date':'14/03/2022',
                    'time':'11:27',
                    'description': '<h3>Un cohete cae al noreste de Kiev</h3><p>En Kiev, los restos de un cohete cayeron en la carretera de Kurenivka: una persona murió y seis resultaron heridas. Un trolebús quedó completamente destruido: no tenía pasajeros, las casas circundantes sufrieron daños.</p><img src="https://telegra.ph/file/27d48890d6a96688d01a1.jpg"/>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.42618183519792, 50.495015613055656]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Gran destrucción como resultado de los bombardeos en el centro de Járkov',
                    'date':'14/03/2022',
                    'time':'12:25',
                    'description': '<h3>Gran destrucción como resultado de los bombardeos en el centro de Járkov</h3><p></p><img src="https://liveuamap.com/pics/2022/03/14/22407030_0.jpg"/>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.240446378195, 50.00253021405988]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Bombardeado un edificio residencial en el distrito Svyatoshinsky de Kiev',
                    'date':'15/03/2022',
                    'time':'07:40',
                    'description': '<h3>Bombardeado un edificio residencial en el distrito Svyatoshinsky de Kiev</h3><p>2 muertos como resultado del bombardeo del ejército ruso contra casas residenciales en el distrito Svyatoshinsky de Kiev</p><img src="https://liveuamap.com/pics/2022/03/14/22407030_0.jpg"/>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.346429048731014, 50.46354740595913]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Los bombardeos rusos atacaran el Barrio de Lukyanivska en Kiev',
                    'date':'15/03/2022',
                    'time':'09:11',
                    'description': '<h3>Los bombardeos rusos atacaran el Barrio de Lukyanivska en Kiev</h3><p></p><img src="https://pbs.twimg.com/media/FN4FJPFWUAImU63?format=jpg&name=900x900"/>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.481430099309243, 50.46167915862856]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Dos misiles rusos bombardean el aeropuerto de en la ciudad de Dnipro',
                    'date':'15/03/2022',
                    'time':'10:40',
                    'description': '<h3>Dos misiles rusos bombardean el aeropuerto de en la ciudad de Dnipro</h3><p>La terminal está dañada y la pista destruida.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [35.09382089094837, 48.36715966557559]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Dos misiles rusos bombardean el aeropuerto de en la ciudad de Dnipro',
                    'date':'15/03/2022',
                    'time':'10:40',
                    'description': '<h3>Dos misiles rusos bombardean el aeropuerto de en la ciudad de Dnipro</h3><p>La terminal está dañada y la pista destruida.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [35.1012898460177, 48.35749622036678]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Fustrado un intento de romper las líneas defensivas al noroeste de Kiev',
                    'date':'15/03/2022',
                    'time':'12:25',
                    'description': '<h3>Fustrado un intento de romper las líneas defensivas al noroeste de Kiev</h3><p>El ejército ucraniano afirma haber frustrado otro intento de las fuerzas rusas de romper la línea defensiva a lo largo del río Irpin al norte de Kiev, esta vez en dirección a Huta Mezhyhirska y Lyutizh.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [48.36715966557559, 35.09382089094837]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Amanece en Vinnytsia, bombardeada por misiles rusos durante la noche',
                    'date':'16/03/2022',
                    'time':'09:28',
                    'description': '<h3>Amanece en Vinnytsia, bombardeada por misiles rusos durante la noche</h3><p></p><img src="https://telegra.ph/file/841907b2895ec3c30a9cf.jpg"/>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [28.5247676239981, 49.228137420847965]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Amanece en Vinnytsia, bombardeada por misiles rusos durante la noche',
                    'date':'16/03/2022',
                    'time':'12:10',
                    'description': '<h3>Buques de guerra rusos bombardean la costa en el área de Lebedevka, Sanzheyka, Zatoka y Belenky</h3><p></p><img src="https://telegra.ph/file/841907b2895ec3c30a9cf.jpg"/>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.600608983162573, 46.22035502868877]
                }
            },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Continua la batalla urbana al sureste de Mariupol',
                    'date':'20/03/2022',
                    'time':'17:05',
                    'description': '<h3>Continua la batalla urbana al sureste de Mariupol</h3><p></p><img src="https://pbs.twimg.com/media/FOThvVZWYAMZTDX?format=jpg&name=small"/>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [37.660350481631596, 47.09965704369272]
                }
            }, 
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'La artillería naval rusa bombardea y daña varios edificios en Odesa',
                    'date':'21/03/2022',
                    'time':'09:05',
                    'description': '<h3>La artillería naval rusa bombardea y daña varios edificios en Odesa</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.758936018372136, 46.46685407389331]
                }
            },  
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Consecuencias de la Batalla por Irpin',
                    'date':'23/03/2022',
                    'time':'09:05',
                    'description': '<h3>Consecuencias de la Batalla por Irpin</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/satelite-white.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.20597, 50.54164]
                }
            },	
            {
                'type': 'Feature',
                'properties': {
                    'message': 'Consecuencias de la Batalla por Mariupol',
                    'date':'29/03/2022',
                    'time':'09:05',
                    'description': '<h3>Consecuencias de la Batalla por Mariupol</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/satelite-white.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [37.54088, 47.09660]
                }
            },			
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Tropas de asalto aerotransportadas ucranianas controlan la ciudad de Pripyat',
                    'date':'03/04/2022',
                    'time':'11:00',
                    'description': '<h3>Tropas de asalto aerotransportadas ucranianas controlan la ciudad de Pripyat</h3><p></p><img src="https://telegra.ph/file/a3b1e8ad7a53abd20db95.jpg"/>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.077322968741427, 51.39357475082056]
                }
	    },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Tropas ucranianas controlan partes de la frontera estatal entre Bielorrusia y Ucrania',
                    'date':'03/04/2022',
                    'time':'11:31',
                    'description': '<h3>Tropas ucranianas controlan partes de la frontera estatal entre Bielorrusia y Ucrania</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [29.45244189300245  , 51.40546239855933]
                }
	    },	
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Se encuentra 410 cuerpos de civiles en las calles de Bucha',
                    'date':'03/04/2022',
                    'time':'18:08',
                    'description': '<h3>Se encuentra 410 cuerpos de civiles en las calles de Bucha</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/muertes-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [30.223617135553532, 50.54720183210865]
                }
	    },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Ucrania restablece el control hasta la frontera con Rusia, en la región de Sumy',
                    'date':'04/04/2022',
                    'time':'07:42',
                    'description': '<h3>Ucrania restablece el control hasta la frontera con Rusia, en la región de Sumy</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [34.321257221219426, 51.87406593746017]
                }
	    },
	    {
                'type': 'Feature',
                'properties': {
                    'message': 'Tropas Rusas Bombardean Sievierodonetsk, Lysychansk, Hirske y Zolote en la región de Lugansk',
                    'date':'07/04/2022',
                    'time':'08:12',
                    'description': '<h3>Tropas Rusas Bombardean Sievierodonetsk, Lysychansk, Hirske y Zolote en la región de Lugansk</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/bombardeo-red.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [38.47345612578738, 48.89078569706745]
                }
	    },
        { 
                'type': 'Feature',
                'properties': {
                    'message': 'Varias poblaciones han sido liberadas en la región Noreste de Jarkov',
                    'date':'10/05/2022',
                    'time':'17:12',
                    'description': '<h3>Varias poblaciones han sido liberadas en la región Noreste de Jarkov</h3><p>El Estado Mayor de las Fuerzas Armadas de Ucrania informa: Que como resulatdo de las acciones coordinadas de las Fuerzas de Defensa de Ucrania en la región de Jarkov, liberan las poblaciones de Cherkasy Tyshky, Rusky Tyshky, Rubizhne y Bayrak.</p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/armados-blue.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.82998280204848, 50.16567275683486]
                }
        },
        {
                'type': 'Feature',
                'properties': {
                    'message': 'Imagen Satelite de los incencios cerca del río Donetsk (11/05/2022)',
                    'date':'11/05/2022',
                    'time':'8:46',
                    'description': '<h3>Imagen Satelite de los incencios cerca del río Donetsk (11/05/2022)</h3>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/satelite-white.svg',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [49.36617, 36.97037]
                }
            },
        {
                'type': 'Feature',
                'properties': {
                    'message': 'Fuerte explosión en el distrito de Kramatorsk',
                    'date':'11/05/2022',
                    'time':'12:46',
                    'description': '<h3>El ejército ruso bombardea almacenes con nitrato de amonio en el distrito de Kramatorsk</h3><p></p>',
                    'icon': 'http://www.ayudaparamiweb.com/icons/explosion-red.svg',
                    'iconSize': [50, 50]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [37.59281677952075, 48.78118566613954]
                }
        }
        ]
    };
      
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
