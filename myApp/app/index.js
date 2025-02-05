import { Text, View } from "react-native";
import React from "react";
import HomePage from "./components/HomePage";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HomePage/>
    </View>
  );
}
