import { Tabs, useRouter } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,

        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.push('/')}
            style={styles.headerButton}
            testID="homeButton"
          >
            <Ionicons name="home" size={24} color="black" options = {{testID: "homeIcon"}}/>
            <Text style={styles.headerButtonText}>Home</Text>
          </TouchableOpacity>
        ),
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case "interest-points":
              iconName = focused ? "pin" : "pin-outline";
              testID = "interestPointsIcon";
              break;
            case "indoor-map":
              iconName = focused ? "map" : "map-outline";
              testID = "indoorMapIcon";
              break;
            case "outdoor-map":
              iconName = focused ? "map" : "map-outline";
              testID = "outdoorMapIcon";
              break;
            case "favorites":
              iconName = focused ? "star" : "star-outline";
              testID = "favoritesIcon"
              break;
            case "index":
              iconName = focused ? "home" : "home-outline";
              break;

          }

   return (
     <View style={[styles.tabItem | focused && styles.activeTabBackground] || [styles.tabItem, focused && styles.activeTabBackground]}>
       <Ionicons
         name={iconName}
         size={24}
         color={focused ? "white" : "grey"}
         style={{ marginTop: focused ? 8 : -8, marginLeft: focused ? 37 : 0}}
       />
     </View>
   );
        },
      })}
    >
      <Tabs.Screen name="interest-points" options={{ headerShown: true, testID: "interestPointsButton" }} />
      <Tabs.Screen name="indoor-map" options = {{testID: "indoorMapButton"}}/>
      <Tabs.Screen name="outdoor-map" options = {{testID: "outdoorMapButton"}}/>
      <Tabs.Screen name="favorites" options = {{testID: "favoritesButton"}}/>


    </Tabs>
  );
}
const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,

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
    zIndex: 1,
  },

  activeTabBackground: {
    backgroundColor: "grey",
    borderRadius: 8,
    width: 100,
    height: 60,
    position: "absolute",
    top: -5,
    left: "50%",
    transform: [{ translateX: -50 }],
    zIndex: 0,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  headerButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
});