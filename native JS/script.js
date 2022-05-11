
require(["esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Bookmarks",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/layers/MapImageLayer"],
    (esriConfig,
        Map,
        MapView,
        Bookmarks,
        Expand,
        BasemapGallery,
        MapImageLayer) => {

        esriConfig.apiKey = "AAPK8f9440d75c9848b887b6d5a7574850e57L1EQJMdo7VF2lVFQenEfee61ZSA0ORBIIhm1AAEUETOM1S_t7nCVX0hWAYgmaJm";
        const map = new Map({
            basemap: "streets-vector" // Basemap layer
        });

        const view = new MapView({
            map: map,
            center: [-118.805, 34.027],
            zoom: 13, // scale: 72223.819286
            container: "map",
            constraints: {
                snapToZoom: false
            }
        });
        //adding map services layers --> in version 3.x it was called ArcGISDynamicMapServiceLayer
        //but in version 4.x it is MapImageLayer
        //layer No. 1 points to the states layer in a service storing U.S. census data
        let layer1 = new MapImageLayer({
            url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
            opacity:0.5
        });
        //layer No. 2 related to U.S. too 

        let layer2 = new MapImageLayer({
            url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
            //*** in case of not using sulayers --> all layers in the mapservice will be loaded 
            // but if using sublayers --> One can determine which layer we need to show
            sublayers: [            
                //*** check https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-Sublayer.html
                //to see what can you use here 
                {
                    id: 3,
                    visible: false
                }, {
                    id: 2,
                    visible: true
                }, {
                    id: 1,
                    visible: true
                }, {
                    id: 0,
                    visible: true,
                    definitionExpression: "pop2000 > 100000",
                    popupTemplate: {
                        title: "{POP2000}",
                        content: "{POP2000}"
                    }
                }
            ],

        })

        //using loadAll method to make sure that all layers in map service are loaded successfully
        layer2.loadAll()
            .catch(function (error) {
                // Ignore any failed resources
            })
            .then(function () {
                console.log("All loaded");
            });
        layer2.when(() => {
            //creating is happening before laoding all layers in map service 
            console.log("instance layer2 is created");
        })
        map.add(layer1);  // adds the layer to the map
        map.add(layer2);  // adds the layer to the map


        //to add widgets make sure that view is loaded using view.when method
        view.when(() => {
            //bookmark widget
            const bookmark = new Bookmarks({
                view,
                // allows bookmarks to be added, edited, or deleted
                editingEnabled: true,
            });
            //create expand widget for bookmark 
            let expandBookMark = new Expand({
                view,
                content: bookmark
            });
            //add the expand widget of bookmark to mapview
            view.ui.add(expandBookMark, 'top-right')
            //create basemap gallery widget
            const baseMapGallery = new BasemapGallery({
                view
            });
            //wrap the basemap gallery widget within expand widget
            let expandBasemap = new Expand({
                view,
                content: baseMapGallery
            })
            //add the expand widget of basemap gallery to mapview
            view.ui.add(expandBasemap, 'top-right')

        })

    })