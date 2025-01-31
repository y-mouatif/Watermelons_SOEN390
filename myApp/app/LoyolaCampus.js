import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoyolaOutdoorMap from "./components/LoyolaOutdoorMap";

export default function LoyolaCampus() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Loyola Campus</Text>
            <LoyolaOutdoorMap />
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
