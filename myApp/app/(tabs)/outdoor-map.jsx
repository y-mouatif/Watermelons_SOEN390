import { View, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import SGWOutdoorMap from "../components/SGWOutdoorMap";
import LoyolaOutdoorMap from "../components/LoyolaOutdoorMap";

export default function OutdoorMap() {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  //setting default to SGW
  React.useEffect(() => {
    if (!type) {
      router.replace("/(tabs)/outdoor-map?type=sgw"); 
    }
  }, [type]);

return(
<View style={styles.container}>
    {type === "sgw" && <SGWOutdoorMap />}
    {type === "loyola" && <LoyolaOutdoorMap />}
</View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
  },
  title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
  },
});
