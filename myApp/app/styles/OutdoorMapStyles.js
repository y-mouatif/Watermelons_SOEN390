import { StyleSheet, Dimensions } from "react-native";

const OutdoorMapStyles = StyleSheet.create({
  containerForMap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titleForMap: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
  },
    container: {
      width: Dimensions.get("window").width - 40,
      height: 700,
      borderRadius: 10,
      overflow: "hidden",
    },
    map: {
      flex: 1,
    },
    buttonContainer: {
      position: "absolute",
      bottom: 20,
      right: 20,
    },
    button: {
      backgroundColor: "#008CBA",
      padding: 12,
      borderRadius: 50,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      alignItems: "center",
      marginBottom: 10,
    },
    debugText: {
      color: "white",
      fontSize: 12,
      marginTop: 4,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    modalText: {
      fontSize: 14,
      textAlign: "center",
      marginBottom: 15,
    },
    closeButton: {
      backgroundColor: "#ff5252",
      padding: 8,
      borderRadius: 20,
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    closeButtonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },  
});

export default OutdoorMapStyles;
