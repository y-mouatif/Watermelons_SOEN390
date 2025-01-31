import React from "react";
import { StyleSheet, View } from "react-native";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw", // Full width
  height: "100vh", // Full height
};

const center = {
  lat: 45.4613509,
  lng: -73.649211,
};
const zoomLevel = 17; 

export default function LoyolaOutdoorMap() {
  return (
     
    <View style={styles.container}>
      <LoadScript googleMapsApiKey="AIzaSyBdODoY5Fr_jtGEJ2P-y3ZqxbZA9QMUoT0">
      

        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoomLevel} // Zooming in closer
        >
  <Marker position={center} />
</GoogleMap>
      </LoadScript>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
