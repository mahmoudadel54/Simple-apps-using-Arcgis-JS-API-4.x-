
require(["esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Bookmarks",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery"],
    (esriConfig,
        Map,
        MapView,
        Bookmarks,
        Expand,
        BasemapGallery) => {

        esriConfig.apiKey = "AAPK8f9440d75c9848b887b6d5a7574850e57L1EQJMdo7VF2lVFQenEfee61ZSA0ORBIIhm1AAEUETOM1S_t7nCVX0hWAYgmaJm";
        const map = new Map({
            basemap: "streets" // Basemap layer
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