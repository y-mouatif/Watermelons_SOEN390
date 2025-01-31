import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Page</Text>

      {/* Link to SGW Campus Map */}
      <Link href='/SGWCampus' style={{ color: "blue", textDecorationLine: "underline" }}>
        Go to SGW Campus Map
      </Link>
      <Link href='/LoyolaCampus' style={{ color: "blue", textDecorationLine: "underline" }}>
        Go to Loyola Campus Map
      </Link>
    </View>
  );
}
