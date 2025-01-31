import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MapView, Marker } from "expo-maps";

export default function SGWOutdoorMap() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SGW Map</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 45.4951962, // SGW Latitude
          longitude: -73.5792229, // SGW Longitude
          latitudeDelta: 0.005, // Zoom level for latitude
          longitudeDelta: 0.005, // Zoom level for longitude
        }}
      >
        <Marker
          coordinate={{
            latitude: 45.4951962,
            longitude: -73.5792229,
          }}
          title="SGW Campus"
          description="Concordia University SGW Campus"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: 400,
  },
});
