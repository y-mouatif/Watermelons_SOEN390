import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoyolaOutdoorMap from "./components/LoyolaOutdoorMap";

export default function LoyolaCampus() {
    
    const navigation = useNavigation();
    
        const handlePress = () => {
            navigation.navigate("SGWCampus");
        };
    
    
    
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Loyola Campus</Text>
            <LoyolaOutdoorMap />
            <Button title="SGW Campus" onPress={handlePress} />
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
