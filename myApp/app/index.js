import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import HomePage from "./screens/HomePage";
import RootNavigator from "./navigators/RootNavigator";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";

export default function Index() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}