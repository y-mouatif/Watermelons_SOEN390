import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import HomeTabs from "../navigators/HomeTabs";

export default function InterestPoints() {
  return (
    <>
                <HomeTabs/>
                <StatusBar style = "auto"/>
      <Text> This is the Interest Points page </Text>

    </>


  );
}
