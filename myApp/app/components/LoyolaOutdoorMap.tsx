import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import useLocation from "../hooks/useLocation";
import styles from "../styles/OutdoorMapStyles";
import { fetchBuildingById } from "../api/buildingService";
import BuildingPopup from "../components/BuildingPopup";
import { buildings, Building } from "../api/buildingData";

const LoyolaOutdoorMap = () => {
  const { location, hasPermission } = useLocation();
  const mapRef = useRef<MapView | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showLocating, setShowLocating] = useState(true);
  const [showPermissionPopup, setShowPermissionPopup] = useState(!hasPermission);

  const loyolaRegion = {
    latitude: 45.4581281,
    longitude: -73.6417009,
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
      if (building) {
        setSelectedBuilding({
          ...building,
          coordinates: building.coordinates ?? [],
          campus: building.campus ?? "",
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
        <Marker
          coordinate={{ latitude: 45.4581281, longitude: -73.6417009 }}
          title="Loyola Campus"
          description="Outdoor Map Location"
        />

        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="You Are Here"
            pinColor="blue"
          />
        )}

        {buildings
          .filter((building) => building.campus === "LOY")
          .map((building) =>
            building.coordinates && building.coordinates.length > 0 ? (
              <Polygon
                key={building.id}
                coordinates={building.coordinates}
                fillColor="rgba(255, 0, 0, 0.4)"
                strokeColor="red"
                strokeWidth={2}
                tappable={true}
                onPress={() => handleBuildingPress(building.id)}
              />
            ) : null
          )}
      </MapView>

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
