import {StyleSheet} from 'react-native';
export const layoutStyle = StyleSheet.create({
      tabBarStyle: {
      height: 80,
      backgroundColor: "#ffffff",
      borderRadius: 40,
      borderTopWidth: 0,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
      position: "absolute",
      bottom: 10,
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
    },
    activeTabBackground: {
      backgroundColor: "grey",
      borderRadius: 40,
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
  