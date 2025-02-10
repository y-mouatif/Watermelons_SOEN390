import React from "react";
import { View, Text, Modal, Button, StyleSheet } from "react-native";
import { Building } from "../api/buildingData"; // Import Building type

interface BuildingPopupProps {
  visible: boolean;
  onClose: () => void;
  building: Building | null;
}

const BuildingPopup: React.FC<BuildingPopupProps> = ({ visible, onClose, building }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {building ? (
            <>
              <Text style={styles.title}>{building.longName}</Text>
              <Text style={styles.text}>📍 {building.name}</Text>
              <Text style={styles.text}>🕒 {building.openHours || "Hours not available"}</Text>
              <Text style={styles.text}>
                ♿ Accessibility: {building.wheelchairAccessible ? "✅ Yes" : "❌ No"}
              </Text>
              <Text style={styles.text}>
                🏛 Departments: {building.departments.length > 0 ? building.departments.join(", ") : "No department info"}
              </Text>
            </>
          ) : (
            <Text style={styles.text}>Loading...</Text>
          )}
          <Button title="Get Directions" onPress={() => alert("Feature coming soon!")} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
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
    width: 320,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default BuildingPopup;
