import "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet } from "react-native";
import { AuthProvider } from "./src/Provider/AuthProvider";
import Navigation from "./src/pages/Navigation";
import { Provider } from "react-redux";
import store from "./src/store/store";
import axios from "axios";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </Provider>
  );
}

/*<AuthProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </AuthProvider> */
/*
<Stack.Navigator>s
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{ title: "Overview" }}
    initialParams={{ itemId: 69, otherParam: "asd asd " }}
  />
  <Stack.Screen name="Details" component={DetailsScreen} />
</Stack.Navigator>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
