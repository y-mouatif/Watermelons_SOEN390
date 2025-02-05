import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SGWOutdoorMap from "./components/SGWOutdoorMap";
import styles from "./styles/OutdoorMapStyles"

export default function SGWCampus() {
    return (
        <View style={styles.containerForMap}>
            <Text style={styles.titleForMap}>Welcome to SGW Campus</Text>
            <SGWOutdoorMap />
        </View>
    );
}
