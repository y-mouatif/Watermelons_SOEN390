import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SGWOutdoorMap from "./components/SGWOutdoorMap";

export default function SGWCampus() {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate("LoyolaCampus");
    };

    
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to SGW Campus</Text>
            <SGWOutdoorMap />
            <Button title="Loyola Campus" onPress={handlePress} />

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
