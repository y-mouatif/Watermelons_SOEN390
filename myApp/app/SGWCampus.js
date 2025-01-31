import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SGWOutdoorMap from "./components/SGWOutdoorMap";

export default function SGWCampus() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to SGW Campus</Text>
            <SGWOutdoorMap />
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
