import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import HomeTabs from "../navigators/HomeTabs";
import { useLocalSearchParams } from "expo-router";
import tabBarStyle from '../navigators/HomeTabs';

export default function InterestPoints() {

return(
<View >
    <Text> This is the Interest Points page</Text>
      <HomeTabs/>
</View>
  );
}
