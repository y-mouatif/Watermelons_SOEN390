import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoyolaOutdoorMap from "./components/LoyolaOutdoorMap";
import styles from "./styles/OutdoorMapStyles"

export default function LoyolaCampus() {
    return (
        <View style={styles.containerForMap}>
            <Text style={styles.titleForMap}>Welcome to Loyola Campus</Text>
            <LoyolaOutdoorMap />
        </View>
    );
}


