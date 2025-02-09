import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import SGWOutdoorMap from "../components/SGWOutdoorMap";
import LoyolaOutdoorMap from "../components/LoyolaOutdoorMap";

export default function OutdoorMap() {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const [isSGW, setIsSGW] = React.useState(type === "sgw");
  
  //setting default to SGW
  React.useEffect(() => {
    if (!type) {
      router.replace("/(tabs)/outdoor-map?type=sgw"); 
    }
  }, [type]);

   // Toggle between SGW and Loyola
   const toggleCampus = () => {
    const newType = isSGW ? "loyola" : "sgw";
    setIsSGW(!isSGW);
    router.replace(`/(tabs)/outdoor-map?type=${newType}`);
  };


return(


<View style={styles.container}>

<View style={styles.switchButtonContainer}>
        <TouchableOpacity style={styles.switchButton} onPress={toggleCampus}>
          <Text style={styles.switchButtonText}>Switch Campus</Text>
        </TouchableOpacity>
      </View>
    {type === "sgw" && <SGWOutdoorMap />}
    {type === "loyola" && <LoyolaOutdoorMap />}
</View>




  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "top",
      alignItems: "center",
      padding: 20,
      position: "relative", 
  },
  title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
  },
  switchButtonContainer: {
    position: "absolute", 
    top: 50, 
    left: 30,
    alignSelf: "center", 
    zIndex: 1, 
  },
  switchButton: {
    backgroundColor: "#922338",
    padding: 10,
    borderRadius: 5,
  },
  switchButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
