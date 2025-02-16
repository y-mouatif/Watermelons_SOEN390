import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons"; // For button icons
// import { isPointInPolygon } from "geolib";
import isPointInPolygon from "geolib/es/isPointInPolygon";
import useLocation from "../hooks/useLocation";
import styles from "../styles/OutdoorMapStyles";
import { buildings, Campus, Building } from "../api/buildingData"; // Ensure correct imports
import { fetchBuildingById } from "../api/buildingService";
import BuildingPopup from "../components/BuildingPopUp"; 

const LoyolaOutdoorMap = () => {
  const { location, hasPermission } = useLocation();
  const mapRef = useRef<MapView | null>(null);
  const [showLocating, setShowLocating] = useState(true);
  const [showPermissionPopup, setShowPermissionPopup] = useState(!hasPermission);
  const [highlightedBuildings, setHighlightedBuildings] = useState<string[]>([]); // Array to track multiple highlighted buildings
  const [selectedBuildings, setSelectedBuildings] = useState<Building[]>([]); // Array for selected buildings
  const [popupVisible, setPopupVisible] = useState(false);

  // Default region for Loyola Campus
  const loyolaRegion = {
    latitude: 45.4581281,
    longitude: -73.6417009,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  // Effect to check if user is inside any building
  useEffect(() => {
    if (location) {
      setShowLocating(false);
      const insideBuildings = buildings
        .filter((b) => b.campus === Campus.LOY)
        .filter((building) => isPointInPolygon(location, building.coordinates))
        .map((building) => building.id); //Collect all buildings user is inside

      setHighlightedBuildings(insideBuildings);
    }

    if (!hasPermission) {
      setShowPermissionPopup(true);
    }
  }, [location, hasPermission]);

  // Function to fetch and show multiple buildings
  const handleBuildingPress = async (buildingId: string) => {
    try {
      const building = await fetchBuildingById(buildingId);

      setSelectedBuildings((prevBuildings) => {
        // Avoid duplicates
        if (!prevBuildings.some((b) => b.id === building.id)) {
          return [...prevBuildings, building];
        }
        return prevBuildings;
      });

      setPopupVisible(true);
    } catch (error) {
      console.error("Error fetching building details:", error);
    }
  };

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
        {/* Markers for Loyola Buildings */}
        {buildings
          .filter((building) => building.campus === Campus.LOY)
          .map((building) => (
            <Marker
              key={building.id}
              coordinate={building.coordinates[0]} // Assuming first coordinate is marker position
              title={building.longName}
              onPress={() => handleBuildingPress(building.id)}
            />
          ))}

        {/* Polygons for Loyola Buildings */}
        {buildings
          .filter((building) => building.campus === Campus.LOY)
          .map((building) => (
            <Polygon
              key={building.id}
              coordinates={building.coordinates}
              fillColor={highlightedBuildings.includes(building.id) ? "rgba(0, 0, 255, 0.4)" : "rgba(255, 0, 0, 0.4)"}
              strokeColor={highlightedBuildings.includes(building.id) ? "blue" : "red"}
              strokeWidth={2}
              tappable
              onPress={() => handleBuildingPress(building.id)}
            />
          ))}
      </MapView>

      {/* Floating Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={centerMapOnUser}>
          <MaterialIcons name="my-location" size={24} color="white" />
          {showLocating && <Text style={styles.debugText}>Locating...</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={centerMapOnLoyola}>
          <MaterialIcons name="place" size={24} color="white" />
          <Text style={styles.debugText}>Loyola</Text>
        </TouchableOpacity>
      </View>

      {/* Building Information Pop-Up */}
      {popupVisible && selectedBuildings.length > 0 && (
        <BuildingPopup
          visible={popupVisible}
          onClose={() => {
            setPopupVisible(false);
            setSelectedBuildings([]); //Clear selected buildings when closing
          }}
          buildings={selectedBuildings} // Correctly passing multiple buildings
        />
      )}

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
