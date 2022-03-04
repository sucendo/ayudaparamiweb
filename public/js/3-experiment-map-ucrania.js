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

        map.addSource('war-ucraine', {
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
                                    [29.3248759, 51.3788689], 
                                    [29.2932737, 51.3646745], 
                                    [29.346864, 51.2338225], 
                                    [29.7046991, 50.9713925], 
                                    [29.6612701, 50.7993574], 
                                    [29.8438358, 50.6742553], 
                                    [29.804024, 50.5875487], 
                                    [29.8054266, 50.5340366], 
                                    [29.8356334, 50.5308324], 
                                    [29.909689, 50.5854301], 
                                    [29.9752933, 50.5545195], 
                                    [30.1320265, 50.5376047], 
                                    [30.1733814, 50.5329259], 
                                    [30.1857282, 50.5588934], 
                                    [30.2595252, 50.5530036], 
                                    [30.2341102, 50.6061955], 
                                    [30.2986374, 50.6253539], 
                                    [30.3271153, 50.6751932], 
                                    [30.3827434, 50.7229051], 
                                    [30.417069, 50.7667586], 
                                    [30.4575753, 50.7897516], 
                                    [30.4761008, 50.8521993], 
                                    [30.5021684, 50.9189083], 
                                    [30.50625, 50.9733991], 
                                    [30.4678674, 51.056304], 
                                    [30.5145535, 51.1304283], 
                                    [30.5063467, 51.1786591], 
                                    [30.3305554, 51.2491891], 
                                    [30.3154937, 51.2629258], 
                                    [30.2872943, 51.2534198], 
                                    [30.2317112, 51.2946966], 
                                    [30.1864472, 51.3418708], 
                                    [30.1157825, 51.4001147], 
                                    [30.0477648, 51.426724], 
                                    [30.0079743, 51.4485546], 
                                    [29.992188, 51.4822432], 
                                    [29.9763891, 51.4851362], 
                                    [29.972275, 51.472527], 
                                    [29.9510009, 51.4735971], 
                                    [29.9431106, 51.4835376], 
                                    [29.9226838, 51.4893607], 
                                    [29.8905911, 51.4819261], 
                                    [29.892306, 51.4735848], 
                                    [29.8789265, 51.4468615], 
                                    [29.8466777, 51.4488036], 
                                    [29.840851, 51.4570402], 
                                    [29.8111538, 51.4466088], 
                                    [29.749877, 51.4554115], 
                                    [29.7251529, 51.4923834], 
                                    [29.7423138, 51.4933446], 
                                    [29.7375127, 51.5314863], 
                                    [29.6750175, 51.5107779], 
                                    [29.6379578, 51.4961415], 
                                    [29.6160161, 51.4926115], 
                                    [29.6046872, 51.4718765], 
                                    [29.5796371, 51.4631138], 
                                    [29.5370818, 51.4840648], 
                                    [29.5329516, 51.4601], 
                                    [29.5157848, 51.4464121], 
                                    [29.5000057, 51.3972049], 
                                    [29.4286213, 51.4134767], 
                                    [29.3911485, 51.4077501], 
                                    [29.3628083, 51.3873155], 
                                    [29.3248759, 51.3788689]
                                ]
                            ]
                        }
                    },
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': [
                                [
                                    [30.6421517, 51.3373938], 
                [30.6929635, 51.3485457], 
                [30.7684945, 51.3348199], 
                [30.8055733, 51.3232356], 
                [30.8879708, 51.3301008], 
                [30.9813546, 51.3729845], 
                [31.0404061, 51.4209667], 
                [31.0802315, 51.4346667], 
                [31.0884713, 51.4569203], 
                [31.0321663, 51.4851498], 
                [30.9140633, 51.4706095], 
                [30.879731, 51.454781], 
                [30.839219, 51.4470787], 
                [30.6984566, 51.4513579], 
                [30.6215523, 51.4718927], 
                [30.6215523, 51.460343], 
                [30.6016396, 51.4594874], 
                [30.5769204, 51.4492184], 
                [30.5920266, 51.4213949], 
                [30.6023263, 51.4248202], 
                [30.6167458, 51.4291016], 
                [30.6215523, 51.4141152], 
                [30.6366585, 51.4004091], 
                [30.6558846, 51.374699], 
                [30.6421517, 51.369984], 
                [30.6359719, 51.357551], 
                [30.6503914, 51.347688], 
                [30.6421517, 51.3373938]
                                ]
                            ]
                        }
                    },
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': [
                                [
                                    [31.2175697, 51.6248356], 
                [31.228556, 51.6303768], 
                [31.2216896, 51.6580729], 
                [31.1880439, 51.7746364], 
                [31.2416023, 51.9628829], 
                [31.2560218, 52.0410866], 
                [31.2319892, 52.0474214], 
                [31.2113899, 52.0613549], 
                [31.2175697, 52.0697973], 
                [31.1770576, 52.074862], 
                [31.1571449, 52.0841458], 
                [31.1427253, 52.1031294], 
                [31.1276191, 52.0976461], 
                [31.0960334, 52.0883651], 
                [31.0376686, 52.0862555], 
                [30.99029, 52.0773942], 
                [30.9655708, 52.0816141], 
                [30.9676307, 52.0883651], 
                [30.9532112, 52.0908964], 
                [30.9504646, 52.0769722], 
                [30.936045, 52.0765501], 
                [30.9408515, 52.0647321], 
                [30.9497779, 52.0588219], 
                [30.9429115, 52.0512219], 
                [30.9284919, 52.0643099], 
                [30.9223121, 52.0520664], 
                [30.9387916, 52.0469991], 
                [30.9298652, 52.0427759], 
                [30.926432, 52.0326387], 
                [30.9188789, 52.0254568], 
                [30.9223121, 52.0174285], 
                [30.9154457, 52.0115121], 
                [30.9229988, 52.0068629], 
                [30.9339851, 51.9979858], 
                [30.9181922, 51.9924896], 
                [30.905146, 52.0055948], 
                [30.893473, 51.9962947], 
                [30.9099525, 51.9886841], 
                [30.8872932, 51.9865698], 
                [30.8955329, 51.973459], 
                [30.8824867, 51.9662675], 
                [30.8673805, 51.973036], 
                [30.8454078, 51.9662675], 
                [30.8385414, 51.9582287], 
                [30.8543342, 51.9531508], 
                [30.8426612, 51.9468026], 
                [30.8213752, 51.956113], 
                [30.8069557, 51.949342], 
                [30.8055824, 51.944263], 
                [30.8268684, 51.9218243], 
                [30.8103889, 51.9078473], 
                [30.7973426, 51.8951372], 
                [30.850901, 51.8417154], 
                [30.9758705, 51.7933267], 
                [31.0939735, 51.6938396], 
                [31.1502784, 51.6435878], 
                [31.2175697, 51.6248356]
                                ]
                            ]
                        }
                    },
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': [
                                [
                                    [34.2276621, 51.9176059], 
                [33.8350418, 51.7669877], 
                [33.453126, 51.6303936], 
                [33.4366465, 51.5348192], 
                [33.3899546, 51.5040561], 
                [33.2938242, 51.4972171], 
                [32.8475046, 51.3653651], 
                [32.3943186, 51.2709521], 
                [31.8865442, 51.1483554], 
                [31.9311762, 51.1319845], 
                [32.1364832, 51.1586919], 
                [32.7524042, 51.2103398], 
                [32.8073359, 51.2103398], 
                [33.0682611, 51.1406015], 
                [33.2618952, 51.0586751], 
                [33.407464, 50.9324841], 
                [33.4349298, 50.8198334], 
                [33.2591486, 50.769486], 
                [32.9735041, 50.7312552], 
                [32.5450373, 50.6407673], 
                [32.5120783, 50.6076609], 
                [32.5752497, 50.5797638], 
                [32.8691339, 50.6372835], 
                [33.10534, 50.6790719], 
                [33.3827448, 50.7190843], 
                [33.4871149, 50.7599312], 
                [33.5393, 50.7981386], 
                [33.5763788, 50.8545242], 
                [33.5049677, 50.924694], 
                [33.4417963, 51.0232726], 
                [33.4788752, 51.0836996], 
                [33.5626459, 51.0802487], 
                [33.5804987, 51.1181939], 
                [33.8469172, 51.1362931], 
                [34.1517878, 51.0690317], 
                [34.2561579, 51.0509061], 
                [34.2685175, 51.0008082], 
                [34.4401789, 50.967956], 
                [34.5624018, 50.9394076], 
                [34.6365595, 50.9584418], 
                [34.7477961, 50.9567117], 
                [34.8247004, 50.9480605], 
                [34.8878717, 50.9238284], 
                [34.8906183, 50.8891892], 
                [34.9853754, 50.8501892], 
                [35.0979853, 50.8475881], 
                [35.2215815, 50.9350806], 
                [35.3273249, 50.9420036], 
                [35.3369379, 50.9636316], 
                [35.3534174, 50.9774682], 
                [35.3314447, 50.9982154], 
                [35.3259516, 51.0146337], 
                [35.365777, 51.0042649], 
                [35.3822565, 51.0129057], 
                [35.3850031, 51.0258639], 
                [35.4097223, 51.0232726], 
                [35.4069757, 51.0422724], 
                [35.389123, 51.0560856], 
                [35.3698969, 51.0690317], 
                [35.3465509, 51.0578119], 
                [35.313592, 51.0819742], 
                [35.2723932, 51.0621276], 
                [35.2435541, 51.0655798], 
                [35.2105951, 51.0422724], 
                [35.1625299, 51.0811115], 
                [35.1405573, 51.0862876], 
                [35.1790094, 51.0923256], 
                [35.1707697, 51.1242278], 
                [35.1240778, 51.1647205], 
                [35.1336908, 51.2370019], 
                [35.0650263, 51.2318427], 
                [35.0389338, 51.206038], 
                [35.0032282, 51.2284029], 
                [34.9620295, 51.2292629], 
                [34.889245, 51.1896876], 
                [34.846673, 51.1931302], 
                [34.8288202, 51.168165], 
                [34.7780085, 51.1828014], 
                [34.72857, 51.1819406], 
                [34.7093439, 51.1707482], 
                [34.6640253, 51.1948515], 
                [34.6612787, 51.2473185], 
                [34.5994806, 51.2516165], 
                [34.5582819, 51.2370019], 
                [34.5170832, 51.2576329], 
                [34.4648981, 51.2490377], 
                [34.3852472, 51.2731001], 
                [34.3055963, 51.2301228], 
                [34.2314386, 51.2713817], 
                [34.2561579, 51.3057359], 
                [34.327569, 51.3486425], 
                [34.3055963, 51.3726526], 
                [34.2314386, 51.406931], 
                [34.2451715, 51.4360474], 
                [34.2863703, 51.4805426], 
                [34.3055963, 51.5249943], 
                [34.2479181, 51.5591585], 
                [34.2012262, 51.6052394], 
                [34.1586542, 51.6427523], 
                [34.1050959, 51.6538298], 
                [34.0844965, 51.662349], 
                [34.1078424, 51.6836401], 
                [34.1792536, 51.6947076], 
                [34.2561579, 51.7040702], 
                [34.3001032, 51.7083253], 
                [34.3152094, 51.7210882], 
                [34.3893671, 51.7159835], 
                [34.4319391, 51.727043], 
                [34.4374323, 51.7457529], 
                [34.4291925, 51.7967407], 
                [34.412713, 51.8340951], 
                [34.3660212, 51.8451257], 
                [34.3344355, 51.8663308], 
                [34.3097162, 51.8858307], 
                [34.2726374, 51.8849831], 
                [34.2561579, 51.8756579], 
                [34.242425, 51.8832877], 
                [34.2589045, 51.8943063], 
                [34.261651, 51.9129469], 
                [34.2437983, 51.9154882], 
                [34.2276621, 51.9176059]
                                ]
                            ]
                        }
                    },
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': [
                                [
                                    
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
                            'type': 'Polygon',
                            'coordinates': [
                                [
                                    [34.9978317, 45.7201889], 
                [34.9264205, 45.8083271], 
                [34.8989547, 45.8886795], 
                [34.8605026, 46.0414107], 
                [35.0252975, 46.0680954], 
                [35.2065719, 46.1556827], 
                [35.409819, 46.368357], 
                [35.2999557, 46.5462149], 
                [35.1131881, 46.6518966], 
                [35.1131881, 46.8250692], 
                [35.1241744, 46.9789501], 
                [35.5361617, 46.9976858], 
                [35.7503951, 47.117439], 
                [35.981108, 47.4007754], 
                [35.9646285, 47.5641194], 
                [35.8163131, 47.7380397], 
                [35.6185592, 47.8634934], 
                [35.4153121, 47.896651], 
                [35.3878463, 47.8044941], 
                [35.3384078, 47.7380397], 
                [35.1955856, 47.7121734], 
                [35.1296676, 47.6715003], 
                [35.1241744, 47.5641194], 
                [34.909941, 47.5122014], 
                [34.5803512, 47.5604127], 
                [34.3331588, 47.5270404], 
                [34.036528, 47.4676593], 
                [33.9980758, 47.3151888], 
                [33.8662399, 47.1585421], 
                [33.6959518, 46.9939392], 
                [33.5970748, 46.8701532], 
                [33.3498825, 46.7648984], 
                [33.1741012, 46.7761855], 
                [32.932402, 46.7272574], 
                [32.7840866, 46.6669772], 
                [32.630278, 46.5990815], 
                [32.4490035, 46.5613249], 
                [32.2897018, 46.5462149], 
                [32.295195, 46.4857327], 
                [32.097441, 46.4932967], 
                [31.9161666, 46.5159822], 
                [31.795317, 46.5386583], 
                [31.5426315, 46.5575478], 
                [31.6579879, 46.4554664], 
                [31.7788375, 46.4743848], 
                [31.9875778, 46.4478972], 
                [32.0534957, 46.4024599], 
                [31.9710983, 46.34561], 
                [31.7898239, 46.3380255], 
                [31.7733444, 46.2735151], 
                [31.8996871, 46.2962922], 
                [32.2182907, 46.1823122], 
                [32.3446334, 46.0985763], 
                [32.6083053, 46.0871479], 
                [33.0312789, 46.1176184], 
                [33.1960739, 46.1556827], 
                [33.3938278, 46.0452236], 
                [33.5256637, 46.0147131], 
                [33.5256637, 46.1023853], 
                [33.53665, 46.1785087], 
                [33.6574996, 46.0871479], 
                [33.5805953, 46.0375975], 
                [33.602568, 45.9498225], 
                [33.7508834, 45.9460031], 
                [33.6739791, 45.907794], 
                [33.6739791, 45.8580828], 
                [33.6190475, 45.8848559], 
                [33.4432662, 45.8427781], 
                [33.2564987, 45.758527], 
                [33.1466354, 45.7968387], 
                [33.1850875, 45.7393612], 
                [32.8829635, 45.6242285], 
                [32.6522506, 45.5088589], 
                [32.498442, 45.4472315], 
                [32.5039352, 45.3508038], 
                [32.6577438, 45.3160496], 
                [32.7456344, 45.3585241], 
                [32.9049362, 45.3585241], 
                [33.1631149, 45.1884348], 
                [33.2564987, 45.1497071], 
                [33.4103073, 45.1923062], 
                [33.5970748, 45.0760518], 
                [33.602568, 44.8817679], 
                [33.53665, 44.8389372], 
                [33.5201705, 44.632124], 
                [33.3828414, 44.5930197], 
                [33.4487594, 44.5068976], 
                [33.5970748, 44.4951438], 
                [33.6849655, 44.4049526], 
                [33.8332809, 44.389253], 
                [34.1024459, 44.4402614], 
                [34.239775, 44.5029799], 
                [34.3441451, 44.5382295], 
                [34.4320358, 44.6829202], 
                [34.7451461, 44.7960745], 
                [34.9813522, 44.8311463], 
                [35.1022018, 44.7843791], 
                [35.1955856, 44.9284561], 
                [35.3548873, 44.9634474], 
                [35.4262985, 45.0061855], 
                [35.409819, 45.0799308], 
                [35.5965866, 45.122582], 
                [35.7558883, 45.0721726], 
                [35.8272994, 44.990648], 
                [36.0525192, 45.0450106], 
                [36.2008346, 45.0139526], 
                [36.4754928, 45.0915661], 
                [36.4040817, 45.1923062], 
                [36.4040817, 45.2735432], 
                [36.5084518, 45.3083235], 
                [36.4425338, 45.3623838], 
                [36.5743698, 45.3392214], 
                [36.6457809, 45.3778202], 
                [36.5908492, 45.4510852], 
                [36.316191, 45.4819052], 
                [36.079985, 45.4626447], 
                [36.079985, 45.4086802], 
                [35.9536422, 45.3662433], 
                [35.8382858, 45.4549386], 
                [35.7833541, 45.4163926], 
                [35.5636276, 45.2967324], 
                [35.4757369, 45.3005964], 
                [35.2560104, 45.4510852], 
                [34.9978317, 45.7201889]
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
            'source': 'war-ucraine',
            'paint': {
                'fill-color': '#B32428',
                'fill-opacity': 0.4
            },
            'filter': ['==', '$type', 'Polygon']
        });

        map.addLayer({
            'id': 'park-volcanoes',
            'type': 'circle',
            'source': 'war-ucraine',
            'paint': {
                'circle-radius': 6,
                'circle-color': '#B42222'
            },
            'filter': ['==', '$type', 'Point']
        });
    });
