import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import useLocation from "../hooks/useLocation";
import styles from "../styles/OutdoorMapStyles";
import { Campus } from "../utils/mapUtils";
import { fetchBuildingById } from "../api/buildingService";
import BuildingPopup from "../components/BuildingPopup";
import { buildings } from "../api/buildingData"; // Import the static buildings array

interface Building {
  id: string;
  name: string;
  longName: string;
  openHours: string;
  wheelchairAccessible: boolean;
  departments: string[];
  services?: string[];
  coordinates: { latitude: number; longitude: number }[];
  campus: Campus;
}

const SGWOutdoorMap = () => {
  const { location, hasPermission } = useLocation();
  const mapRef = useRef<MapView | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showLocating, setShowLocating] = useState(true);
  const [showPermissionPopup, setShowPermissionPopup] = useState(
    !hasPermission
  );

  const campusRegion = {
    latitude: 45.4951962,
    longitude: -73.5792229,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  useEffect(() => {
    if (location) {
      setShowLocating(false);
    }
    if (!hasPermission) {
      setShowPermissionPopup(true);
    }
  }, [location, hasPermission]);

  const handleBuildingPress = async (id: string) => {
    try {
      const building = await fetchBuildingById(id);
      if (building && building.coordinates && building.campus) {
        setSelectedBuilding({
          id: building.id,
          name: building.name,
          longName: building.longName,
          openHours: building.openHours,
          wheelchairAccessible: building.wheelchairAccessible ?? false,
          departments: building.departments || [],
          services: building.services || [],
          coordinates: building.coordinates,
          campus: building.campus as Campus,
        });
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error fetching building info:", error);
    }
  };

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
        <Marker
          coordinate={{ latitude: 45.4951962, longitude: -73.5792229 }}
          title="SGW Campus"
          description="Outdoor Map Location"
        />

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

        {buildings
          .filter((b) => b.campus === Campus.SGW)
          .map(
            (building) =>
              building.coordinates && building.coordinates.length > 0 ? ( // ✅ Check if coordinates exist
                <Polygon
                  key={building.id}
                  coordinates={building.coordinates}
                  fillColor="rgba(255, 0, 0, 0.4)"
                  strokeColor="red"
                  strokeWidth={2}
                  tappable={true}
                  onPress={() => handleBuildingPress(building.id)}
                />
              ) : null // 🔹 Prevents rendering empty polygons
          )}
      </MapView>

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

      <BuildingPopup
        visible={showPopup}
        building={selectedBuilding}
        onClose={() => setShowPopup(false)}
      />

      <Modal visible={showPermissionPopup} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Location Permission Denied</Text>
            <Text style={styles.modalText}>
              Location access is required to show your current location on the
              map. Please enable location permissions in your settings.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPermissionPopup(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SGWOutdoorMap;
