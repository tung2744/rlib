import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import { SelectScreen } from "./screens/SelectScreen";

const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Select examples from the drawer.</Text>
    </View>
  );
}

const linking = {
  prefixes: [location.host],
  config: {
    screens: {
      Home: "",
      Select: "/select",
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Select" component={SelectScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
});
