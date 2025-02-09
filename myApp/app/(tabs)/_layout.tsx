import { Tabs, useRouter } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "../styles/LayoutStyles.js"

interface HeaderLeftButtonProps {
  onPress: () => void;
}

const HeaderLeftButton: React.FC<HeaderLeftButtonProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.headerButton}>
    <Ionicons name="home" size={24} color="black" />
    <Text style={styles.headerButtonText}>Home</Text>
  </TouchableOpacity>
);

interface TabIconProps {
  route: { name: string };
  color: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ route, color, focused }) => {
  let iconName: keyof typeof Ionicons.glyphMap | undefined;
  switch (route.name) {
    case "(tabs)/loyola-campus":
      iconName = focused ? "map" : "map-outline";
      break;
    case "(tabs)/sgw-campus":
      iconName = focused ? "location" : "location-outline";
      break;
    case "(tabs)/interest-points":
      iconName = focused ? "pin" : "pin-outline";
      break;
    case "(tabs)/indoor-map":
      iconName = focused ? "map" : "map-outline";
      break;
    case "(tabs)/outdoor-map":
      iconName = focused ? "map" : "map-outline";
      break;
    case "../index":
      iconName = focused ? "home" : "home-outline";
      break;
    default:
      iconName = "help-circle-outline"; // Default fallback icon
  }

  return (
    <View style={[styles.tabItem, focused && styles.activeTabBackground]}>
      <Ionicons name={iconName} size={24} color={color} />
    </View>
  );
};

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarActiveTintColor: '#ffd33d',
        tabBarInactiveTintColor: 'grey',
        headerLeft: () => <HeaderLeftButton onPress={() => router.push('/')} />, 
        tabBarIcon: ({ color, focused }) => <TabIcon route={route} color={color} focused={focused} />, 
      })}
    >
      <Tabs.Screen name="(tabs)/interest-points" options={{ headerShown: true }} />
      <Tabs.Screen name="(tabs)/indoor-map" options={{}} />
      <Tabs.Screen name="outdoor-map" options={{}} />
      <Tabs.Screen name="../index" options={{}} />
    </Tabs>
  );
}
