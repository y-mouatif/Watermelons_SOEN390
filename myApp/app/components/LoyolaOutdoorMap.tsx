import React, { useRef, useState, useEffect } from "react";
import { 
  StyleSheet, 
  View, 
  Dimensions, 
  TouchableOpacity, 
  Text, 
  Modal 
} from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons"; // For button icons
import useLocation from "../hooks/useLocation";
import styles from "../styles/OutdoorMapStyles"
import { buildings, Campus } from "../utils/mapUtils";

const LoyolaOutdoorMap = () => {
  const { location, errorMsg, hasPermission } = useLocation();
  const mapRef = useRef<MapView | null>(null);
  const [showLocating, setShowLocating] = useState(true);
  const [showPermissionPopup, setShowPermissionPopup] = useState(!hasPermission);

  // Default region for Loyola Campus
  const loyolaRegion = {
    latitude: 45.4581281,
    longitude: -73.6417009,
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

  // Function to center map on Loyola Campus
  const centerMapOnLoyola = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(loyolaRegion, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <MapView 
        ref={(ref) => (mapRef.current = ref)}
        style={styles.map}
        initialRegion={loyolaRegion}
        showsUserLocation={true}
      >
        {/* Marker for Loyola Campus */}
        <Marker
          coordinate={{
            latitude: 45.4581281,
            longitude: -73.6417009,
          }}
          title="Loyola Campus"
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

        {/* Render polygons for SGW buildings */}
        {buildings
          .filter((building) => building.campus === Campus.LOY) 
          .map((building) => (
            <Polygon
              key={building.name}
              coordinates={building.coordinates}
              fillColor="rgba(255, 0, 0, 0.4)" 
              strokeColor="red"
              strokeWidth={2}
            />
        ))}
      </MapView>

      {/* Floating Buttons */}
      <View style={styles.buttonContainer}>
        {/* Button to center on user location */}
        <TouchableOpacity style={styles.button} onPress={centerMapOnUser}>
          <MaterialIcons name="my-location" size={24} color="white" />
          {showLocating && <Text style={styles.debugText}>Locating...</Text>}
        </TouchableOpacity>

        {/* Button to center on Loyola Campus */}
        <TouchableOpacity style={styles.button} onPress={centerMapOnLoyola}>
          <MaterialIcons name="place" size={24} color="white" />
          <Text style={styles.debugText}>Loyola</Text>
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
export default LoyolaOutdoorMap;