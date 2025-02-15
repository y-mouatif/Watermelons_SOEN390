import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Modal, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import useLocation from "../hooks/useLocation";
import styles from "../styles/InterestPointsStyles";

//hard-coded API key
const GOOGLE_PLACES_API_KEY = "AIzaSyA-1hK-5QvW-HgnW1uN-nUJf9z1fCwulsQ";

// --- Custom Marker Components ---
const CoffeeMarker = () => (
  <View style={styles.coffeeMarker}>
    <MaterialCommunityIcons name="coffee" size={20} color="#fff" />
  </View>
);

const RestaurantMarker = () => (
  <View style={styles.restaurantMarker}>
    <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#fff" />
  </View>
);

const InterestPoints = () => {
  // Default region centered on SGW (example)
  const defaultRegion = {
    latitude: 45.4951962,
    longitude: -73.5792229,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const { location, hasPermission } = useLocation();
  const mapRef = useRef(null);
  const [region, setRegion] = useState(defaultRegion);
  const [lastFetchedRegion, setLastFetchedRegion] = useState(defaultRegion);
  const [loading, setLoading] = useState(false);
  const [showLocating, setShowLocating] = useState(true);
  const [showPermissionPopup, setShowPermissionPopup] = useState(!hasPermission);
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  // When user location becomes available, center the map and fetch places.
  useEffect(() => {
    if (location) {
      console.debug("User location obtained:", location);
      setShowLocating(false);
      setRegion((prev) => ({
        ...prev,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
      // Also update the lastFetchedRegion if this is the first load.
      if (!lastFetchedRegion) setLastFetchedRegion(region);
      fetchPlacesForRegion();
    } else {
      console.debug("User location not yet available or permission denied.");
    }
    if (!hasPermission) {
      console.warn("Location permission denied.");
      setShowPermissionPopup(true);
    }
    
  }, [location, hasPermission]);

  // Monitor region changes to conditionally show the update button.
  useEffect(() => {
    // Calculate the difference from the last fetched region.
    const latDiff = Math.abs(region.latitude - lastFetchedRegion.latitude);
    const lngDiff = Math.abs(region.longitude - lastFetchedRegion.longitude);
    // If moved more than the threshold, show the update button.
    if (latDiff > 0.005 || lngDiff > 0.005) {
      setShowUpdateButton(true);
    } else {
      setShowUpdateButton(false);
    }
  }, [region, lastFetchedRegion]);

  /**
   * Fetch places (coffee shops & restaurants) for the current region.
   */
  const fetchPlacesForRegion = async () => {
    setLoading(true);
    try {
      const { latitude, longitude } = region;
      const radius = 2000; // meters
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=coffee|restaurant&key=${GOOGLE_PLACES_API_KEY}`;
      console.debug("Fetching places for region:", region, "URL:", url);
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && Array.isArray(data.results)) {
        const coffee = [];
        const resto = [];

        data.results.forEach((place) => {
          const types = place.types || [];
          if (types.includes("restaurant")) {
            resto.push(place);
          } else if (types.includes("cafe") || place.name.toLowerCase().includes("coffee")) {
            coffee.push(place);
          }
        });

        setCoffeeShops(coffee);
        setRestaurants(resto);
        console.debug(`Found ${coffee.length} coffee shops, ${resto.length} restaurants.`);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    // Once fetched, update the last fetched region and hide the update button.
    setLastFetchedRegion(region);
    setShowUpdateButton(false);
  };

  /**
   * Centers the map on the user's current location.
   */
  const centerMapOnUser = () => {
    if (location && mapRef.current) {
      console.debug("Centering map on user location:", location);
      mapRef.current.animateToRegion(
        {
          ...region,
          latitude: location.latitude,
          longitude: location.longitude,
        },
        1000
      );
    } else {
      console.warn("Cannot center map - user location not available.");
    }
  };

  /**
   * Zoom in/out functions.
   */
  const handleZoomIn = () => {
    console.debug("Zooming in");
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta / 2,
      longitudeDelta: prev.longitudeDelta / 2,
    }));
  };

  const handleZoomOut = () => {
    console.debug("Zooming out");
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 2,
      longitudeDelta: prev.longitudeDelta * 2,
    }));
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => {
          setRegion(newRegion);
          console.debug("Map region changed:", newRegion);
        }}
        showsUserLocation={true}
        showsPointsOfInterest={false}
        showsBuildings={false}
      >
        {/* Coffee shop markers */}
        {coffeeShops.map((shop) => {
          const lat = shop.geometry?.location?.lat;
          const lng = shop.geometry?.location?.lng;
          if (!lat || !lng) return null;
          return (
            <Marker
              key={shop.place_id}
              coordinate={{ latitude: lat, longitude: lng }}
              title={shop.name}
            >
              <CoffeeMarker />
            </Marker>
          );
        })}

        {/* Restaurant markers */}
        {restaurants.map((restaurant) => {
          const lat = restaurant.geometry?.location?.lat;
          const lng = restaurant.geometry?.location?.lng;
          if (!lat || !lng) return null;
          return (
            <Marker
              key={restaurant.place_id}
              coordinate={{ latitude: lat, longitude: lng }}
              title={restaurant.name}
            >
              <RestaurantMarker />
            </Marker>
          );
        })}
      </MapView>

      {/* Loading indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E88E5" />
        </View>
      )}

      {/* Grouped Floating Buttons (center on user & zoom controls) */}
      <View style={styles.floatingButtonsContainer}>
        <TouchableOpacity style={styles.centerButton} onPress={centerMapOnUser}>
          <MaterialIcons name="my-location" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.zoomContainer}>
          <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
            <MaterialIcons name="remove" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Update Results Button (appears when map moves) */}
      {showUpdateButton && (
        <View style={styles.updateButtonContainer}>
          <TouchableOpacity style={styles.updateButton} onPress={fetchPlacesForRegion}>
            <Text style={styles.updateButtonText}>Update Results</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal for location permission denial */}
      <Modal visible={showPermissionPopup} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Location Permission Denied</Text>
            <Text style={styles.modalText}>
              Location access is required to show your current location on the map.
              Please enable location permissions in your settings.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                console.debug("Closing permission modal.");
                setShowPermissionPopup(false);
              }}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InterestPoints;
