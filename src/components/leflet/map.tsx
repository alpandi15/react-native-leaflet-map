import { StyleSheet, useWindowDimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { MapViewProps, MarkerProps, RegionProps } from './types';
import { MyHTML } from './html';

const defaultFunction = () => { };

export default function MapView({
  debug = false,
  markerCenter = false,
  markers = [],
  region = {
    latitude: 3.5881502803013103,
    longitude: 98.67301941179905,
  },
  zoom = 15,
  fitBound = false,
  showMarkerClicked = false,
  showAttribution = true,
  routingDirection,
  mapOnClick = defaultFunction,
  mapOnMove = defaultFunction,
  mapOnMoveEnd = defaultFunction,
}: MapViewProps) {
  const { width, height } = useWindowDimensions();
  const [regionX, setRegionX] = useState<RegionProps>(region);
  const [markersX, setMarkersX] = useState<MarkerProps[]>(markers);
  const webviewRef = useRef(null);

  // Mengupdate marker dan region secara bertahap
  useEffect(() => {
    if (JSON.stringify(markers) !== JSON.stringify(markersX)) {
      setMarkersX(markers);
    }
    if (region.latitude !== regionX?.latitude || region.longitude !== regionX?.longitude) {
      setRegionX(region);
    }

    if (debug) {
      console.log('render MapView', new Date());
      console.log('MapView markers before update: ', markersX);
      console.log('MapView markers after update: ', markers);
      console.log('MapView region before update: ', regionX);
      console.log('MapView region after update: ', region);
    }
  }, [debug, markers, markersX, region, regionX]);

  // Menghandle pesan yang diterima dari WebView
  const handleOnMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.event_name === 'mapOnClick' && mapOnClick !== defaultFunction) {
      if (debug) {
        console.log(data.event_name + ': ' + JSON.stringify(data));
      }
      mapOnClick(data);
    }

    if (data.event_name === 'mapOnMove' && mapOnMove !== defaultFunction) {
      if (debug) {
        console.log(data.event_name + ': ' + JSON.stringify(data));
      }
    }

    if (data.event_name === 'mapOnMoveEnd' && mapOnMoveEnd !== defaultFunction) {
      if (debug) {
        console.log(data.event_name + ': ' + JSON.stringify(data));
      }
      mapOnMoveEnd(data);
    }
  };

  // HTML SOURCE dari MyHTML
  const html = MyHTML({
    region: regionX,
    markers: markersX,
    markerCenter,
    zoom,
    fitBound,
    showMarkerClicked,
    showAttribution,
    routingDirection,
  });


  const stylesX = StyleSheet.create({
    webView: {
      flex: 1,
      width,
      height,
    },
  });

  return (
    <WebView
      ref={webviewRef}
      source={{ html }}
      style={stylesX.webView}
      javaScriptEnabled={true}
      onMessage={handleOnMessage}
    />
  );
}
