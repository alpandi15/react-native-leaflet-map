import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import {MapView, MarkerProps} from '../../components/leflet';
import ButtonComponent from '../../components/button/button.component';

export default function MapComponent() {
  const [markers, setMarkers] = useState<MarkerProps[]>([]);

  const onClickMarker = (e) => {
    // console.log('MARKER ', e);
    setMarkers((prev) => [...prev, {
      latitude: e?.latitude,
      longitude: e?.longitude,
    }]);
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <MapView
        debug={false}
        mapOnClick={onClickMarker}
        markers={markers}
        routingDirection
        // markerCenter
        // showMarkerClicked
      />
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white z-10 rounded-s-xl">
        <View className="flex-row w-full justify-between items-center gap-x-4">
          <ButtonComponent className="flex-1">Find Route</ButtonComponent>
          <ButtonComponent mode="outlined" onPress={() => setMarkers([])}>Reset</ButtonComponent>
        </View>
      </View>
    </View>
  );
}

