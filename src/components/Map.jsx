import React from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";

//FUNCTIONAL COMPONENT THAT RENDERS THE MAP
const Map = props => {
  return (
    <GoogleMap
      defaultZoom={6}
      defaultCenter={{ lat: 51.1642292, lng: 10.4541194 }}
      defaultOptions={{ styles: {} }}
    >
      {props.customMarkers.length > 0 &&
        props.customMarkers.map((coord, index) => (
          <Marker
            key={index}
            position={{
              lat: coord.lat,
              lng: coord.lng
            }}
          />
        ))}
    </GoogleMap>
  );
};

//HOC COMPONENT CREATED OUT OF THE MAP 
const MapWrapped = withScriptjs(withGoogleMap(Map));

export default MapWrapped;
