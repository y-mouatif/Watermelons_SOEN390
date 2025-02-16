import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
// import { isPointInPolygon } from "geolib";
import isPointInPolygon from "geolib/es/isPointInPolygon";
import useLocation from "../hooks/useLocation";
import styles from "../styles/OutdoorMapStyles";
import { fetchBuildingById } from "../api/buildingService";
import { buildings, Campus, Building } from "../api/buildingData";
import BuildingPopup from "../components/BuildingPopUp";

const SGWOutdoorMap = () => {
  const { location, hasPermission } = useLocation();
  const mapRef = useRef<MapView | null>(null);
  const [showLocating, setShowLocating] = useState(true);
  const [showPermissionPopup, setShowPermissionPopup] = useState(!hasPermission);
  const [highlightedBuildings, setHighlightedBuildings] = useState<string[]>([]);
  const [selectedBuildings, setSelectedBuildings] = useState<Building[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);

  // Default region for SGW Campus
  const campusRegion = {
    latitude: 45.4951962,
    longitude: -73.5792229,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  // Effect to check if user is inside a building and update `highlightedBuildings`
  // useEffect(() => {
  //   console.log("User Location:", location); // Debugging
  //   if (location) {
  //     setShowLocating(false);

  //     const foundBuildings: string[] = buildings
  //       .filter((b) => b.campus === Campus.SGW)
  //       .filter((b) => isPointInPolygon(location, b.coordinates))
  //       .map((b) => b.id);

  //     setHighlightedBuildings(foundBuildings);
  //   }

  //   if (!hasPermission) {
  //     setShowPermissionPopup(true);
  //   }
  // }, [location, hasPermission]);

  useEffect(() => {
    // Log the entire buildings array once when the component mounts
    // console.log("Buildings Data:", buildings);
  
    if (location) {
      // console.log("Checking buildings for location:", location);
  
      buildings
        .filter((b) => b.campus === Campus.SGW)
        .forEach((building) => {
          const inside = isPointInPolygon(location, building.coordinates);
          // console.log(
          //   `Building ${building.id}: Location: ${JSON.stringify(location)}, Polygon: ${JSON.stringify(building.coordinates)}, Inside? ${inside}`
          // );
        });
    }
  }, [location]);
  
  

  // Function to fetch and show building details
  const handleBuildingPress = async (buildingId: string) => {
    try {
      const building = await fetchBuildingById(buildingId);

      //Add to selectedBuildings **only if not already added**
      setSelectedBuildings((prevBuildings) => {
        return prevBuildings.some((b) => b.id === building.id)
          ? prevBuildings
          : [...prevBuildings, building];
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
        {/* Markers for SGW Buildings */}
        {buildings
          .filter((b) => b.campus === Campus.SGW)
          .map((building) => (
            <Marker
              key={`marker-${building.id}`}
              coordinate={building.coordinates[0]}
              title={building.longName}
              onPress={() => handleBuildingPress(building.id)}
            />
          ))}

        {/* Polygons for SGW Buildings */}
        {buildings
          .filter((b) => b.campus === Campus.SGW)
          .map((building) => (
            <Polygon
              key={`polygon-${building.id}`}
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

        <TouchableOpacity style={styles.button} onPress={centerMapOnCampus}>
          <MaterialIcons name="place" size={24} color="white" />
          <Text style={styles.debugText}>SGW</Text>
        </TouchableOpacity>
      </View>

      {/* Building Information Pop-Up */}
      {popupVisible && selectedBuildings.length > 0 && (
        <BuildingPopup
          visible={popupVisible}
          onClose={() => setPopupVisible(false)}
          buildings={selectedBuildings}
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

export default SGWOutdoorMap;
