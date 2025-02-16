import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Building } from "../api/buildingData"; // Import Building type
import { MaterialIcons } from "@expo/vector-icons"; // For icons

interface BuildingPopupProps {
  visible: boolean;
  onClose: () => void;
  buildings: Building[]; // Accept an array of buildings
}

const BuildingPopup: React.FC<BuildingPopupProps> = ({ visible, onClose, buildings }) => {
  if (!visible) return null; // Prevent rendering when not visible

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.popup}>
          <Text style={styles.title}>Building Information</Text>
          <ScrollView style={styles.scrollView}>
            {buildings.length === 0 ? (
              <Text style={styles.text}>No buildings selected.</Text>
            ) : (
              buildings.map((building) => (
                <View key={building.id} style={styles.buildingContainer}>
                  <Text style={styles.subTitle}>📍 {building.name}</Text>
                  <Text style={styles.text}>🏛 {building.longName}</Text>
                  <Text style={styles.text}>🕒 {building.openHours || "Hours not available"}</Text>
                  <Text style={styles.text}>
                    ♿ Accessibility: {building.wheelchairAccessible ? "✅ Yes" : "❌ No"}
                  </Text>
                  <Text style={styles.text}>
                    🏢 Departments: {building.departments.length > 0 ? building.departments.join(", ") : "No department info"}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => alert("Feature coming soon!")}>
              <MaterialIcons name="directions" size={20} color="white" />
              <Text style={styles.buttonText}>Get Directions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
              <MaterialIcons name="close" size={20} color="white" />
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popup: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 350,
    elevation: 5, // Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  scrollView: {
    maxHeight: 250, // ✅ Allow scrolling if multiple buildings are displayed
  },
  buildingContainer: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  closeButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default BuildingPopup;
