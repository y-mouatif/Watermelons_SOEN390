import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InterestPoints from '../screens/InterestPointsPage';
import Favorites from '../screens/FavoritesPage';
import IndoorMap from '../screens/IndoorMapPage';
import Index from './../index';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, StyleSheet, View } from 'react-native';

const Tab = createBottomTabNavigator();
const HomeTabs = () => {


    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;

                    switch (route.name) {
                        case "Index":
                             iconName = focused ? "home" : "home-outline";
                             break;
                        case "InterestPoints":
                            iconName = focused ? "pin" : "pin-outline";
                            break;
                        case "Favorites":
                            iconName = focused ? "star" : "star-outline";
                            break;
                        case "IndoorMap":
                            iconName = focused ? "map" : "map-outline";
                            break;
                    }

                    return (
                        <View style={[styles.tabItem, focused && styles.activeTabBackground]}>
                            <Ionicons name={iconName} size={20} color={color} style={{margin: -10}}/>
                        </View>

                    );
                },
                tabBarStyle: styles.tabBarStyle,
                tabBarItemStyle: styles.tabBarItemStyle,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "grey",
            })}
            >
            <Tab.Screen name="Index" component={Index} />
            <Tab.Screen name="InterestPoints" component={InterestPoints} />
            <Tab.Screen name="Favorites" component={Favorites} />
            <Tab.Screen name="IndoorMap" component={IndoorMap} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        backgroundColor: "#ffffff",
        position: 'relative',
        left: 20,
        right: 20,
        borderRadius: 40,
        borderTopWidth: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        bottom: 20,
    },

    tabBarItemStyle: {
        paddingVertical: 10,
        borderRadius: 40,


    },

    tabItem: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 30,
        position: 'absolute',


    },

    activeTabBackground: {
        position: 'absolute',
        backgroundColor: "grey",
        borderRadius: 40,
        width: 100,
        height: 60,
        top: -5,
        left: '50%',
        transform: [{ translateX: -50 }],
        zIndex: 0,
        bottom: 10,
    },




});

export default HomeTabs;
