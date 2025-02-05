import React, { useRef, useState, useEffect } from "react";
import { 
  StyleSheet, 
  View, 
  Dimensions, 
  TouchableOpacity, 
  Text, 
  Modal 
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons"; 
import useLocation from "../hooks/useLocation";
import styles from "../styles/OutdoorMapStyles"

const SGWOutdoorMap = () => {
  const { location, errorMsg, hasPermission } = useLocation();
  const mapRef = useRef<MapView | null>(null);
  const [showLocating, setShowLocating] = useState(true);
  const [showPermissionPopup, setShowPermissionPopup] = useState(!hasPermission);

  // Default region for SGW Campus
  const campusRegion = {
    latitude: 45.4951962,
    longitude: -73.5792229,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  // Effect to update the locating state
  useEffect(() => {
    if (location) {
      setShowLocating(false);
    }
    if (!hasPermission) {
      setShowPermissionPopup(true);
    }
  }, [location, hasPermission]);

  // Function to center map on user's location
  const centerMapOnUser = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );
    }
  };

  // Function to center map on SGW Campus
  const centerMapOnCampus = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(campusRegion, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <MapView 
        ref={(ref) => (mapRef.current = ref)}
        style={styles.map}
        initialRegion={campusRegion}
        showsUserLocation={true}
      >
        {/* Marker for SGW Campus */}
        <Marker
          coordinate={{
            latitude: 45.4951962,
            longitude: -73.5792229,
          }}
          title="SGW Campus"
          description="Outdoor Map Location"
        />

        {/* Marker for User Location */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You Are Here"
            pinColor="blue"
          />
        )}
      </MapView>

      <View style={styles.buttonContainer}>
        {/* Button to center on user location */}
        <TouchableOpacity style={styles.button} onPress={centerMapOnUser}>
          <MaterialIcons name="my-location" size={24} color="white" />
          {showLocating && <Text style={styles.debugText}>Locating...</Text>}
        </TouchableOpacity>

        {/* Button to center on SGW Campus */}
        <TouchableOpacity style={styles.button} onPress={centerMapOnCampus}>
          <MaterialIcons name="place" size={24} color="white" />
          <Text style={styles.debugText}>SGW</Text>
        </TouchableOpacity>
      </View>

      {/* Popup Modal for Location Permission Denial */}
      <Modal visible={showPermissionPopup} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Location Permission Denied</Text>
            <Text style={styles.modalText}>
              Location access is required to show your current location on the map. 
              Please enable location permissions in your settings.
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowPermissionPopup(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default SGWOutdoorMap;
