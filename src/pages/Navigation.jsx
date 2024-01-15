import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import CarStack from "./CarsStack";
import LoginPage from "./LoginPage";
import { useSelector } from "react-redux";
import MyComponent from "./AccountPage";
import PageForTest from "./PageForTest";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Navigation() {
  const state = useSelector((state) => state.auth);
  console.log(state);
  return (
    <>
      {state.accessToken != null ? (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Cars" component={CarStack} />
            <Drawer.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            <Drawer.Screen name="Account" component={MyComponent} />
            <Drawer.Screen name="For testing" component={PageForTest} />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginPage} />
            </Stack.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
}
