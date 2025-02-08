import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { homepageStyles as styles } from '../styles/HomePageStyles.js';

export default function HomePage() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <Image 
                style={styles.logo}
                source={require('../../assets/images/logo.png')}
                resizeMode="contain"
            />
            <View style={styles.buttonsContainer}>
                <Text style={styles.title}>Getting around campus</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => navigation.navigate('MainApp', { screen: 'SGWCampus' })}
                    >
                        <Text style={styles.buttonText}>SGW Campus</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => navigation.navigate('MainApp', { screen: 'LoyolaCampus' })}
                    >
                        <Text style={styles.buttonText}>Loyola Campus</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Browse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => navigation.navigate('MainApp', { screen: 'InterestPoints' })}
                    >
                        <Text style={styles.buttonText}>Interest Points</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonOrange}>
                        <Text style={styles.buttonText}>Directions to my next class</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
