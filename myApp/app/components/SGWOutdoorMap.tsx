import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const SGWOutdoorMap = () => {
  // Define the region to be displayed on the map
  const mapRegion = {
    latitude: 45.4951962,
    longitude: -73.5792229,
    latitudeDelta: 0.005,  // smaller delta for a closer zoom
    longitudeDelta: 0.005,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={mapRegion}>
        <Marker
          coordinate={{
            latitude: 45.4951962,
            longitude: -73.5792229,
          }}
          title="SGW Campus"
          description="Outdoor Map Location"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Adjust the width and height as needed.
    width: Dimensions.get('window').width - 40, // assumes some horizontal padding from parent
    height: 700, // fixed height for the map
    borderRadius: 10,
    overflow: 'hidden', // to ensure the borderRadius is applied to the map
  },
  map: {
    flex: 1,
  },
});

export default SGWOutdoorMap;
