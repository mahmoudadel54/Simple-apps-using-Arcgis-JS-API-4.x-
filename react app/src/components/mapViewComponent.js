import React, {useEffect, useState} from 'react';
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView';
import {BookmarksWidget, BasemapGalleryWidget} from './widgets/index'
function MapViewComponent(props) {
  const mapRef = React.createRef();
  const [mapview, setMapview] = React.useState();

  useEffect(() => {
    if (mapRef.current) {
      let view = new MapView({
        map:new Map({
          basemap:'osm'
        }),
        zoom:3,
        container:mapRef.current
      });
      view.when((mapview)=>{
        setMapview(mapview);
      })
    }
  }, [mapRef.current]);

  return <div style={{height:'100vh', width:'100vw'}} ref={mapRef} >
    {mapview&& 
    <>
      <BookmarksWidget view={mapview} />
      <BasemapGalleryWidget view={mapview} />
    </> }
  </div>;
}

export default MapViewComponent;
