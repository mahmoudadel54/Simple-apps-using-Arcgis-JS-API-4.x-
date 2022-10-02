import React, { useEffect, useState } from 'react';
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import { BookmarksWidget, BasemapGalleryWidget } from './widgets/index';

function MapViewComponent(props) {
  const mapRef = React.createRef();
  const [mapview, setMapview] = React.useState();

  useEffect(() => {
    if (mapRef.current) {
      let map = new Map({
        basemap: 'osm'
      })
      let view = new MapView({
        map,
        zoom: 3,
        container: mapRef.current
      });
      //adding map services layers --> in version 3.x it was called ArcGISDynamicMapServiceLayer
      //but in version 4.x it is MapImageLayer
      //layer No. 1 points to the states layer in a service storing U.S. census data
      let layer1 = new MapImageLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
        opacity: 0.5
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
      let featLayer= new FeatureLayer({
        // URL to the service
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0"
      });
      map.add(featLayer)
      view.on('click',(e)=>{
        view.hitTest(e).then(res=>
          {
            console.log(res);   //works only with graphics (in case of featurelayer or graphical layer)
          })
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
      view.when((mapview) => {
        setMapview(mapview);
      })
    }
  }, [mapRef.current]);

  return <div style={{ height: '100vh', width: '100vw' }} ref={mapRef} >
    {mapview &&
      <>
        <BookmarksWidget view={mapview} />
        <BasemapGalleryWidget view={mapview} />
      </>}
  </div>;
}

export default MapViewComponent;
