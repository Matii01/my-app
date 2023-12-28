import "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet } from "react-native";
import { AuthProvider } from "./src/Provider/AuthProvider";
import Navigation from "./src/pages/Navigation";
import { Provider } from "react-redux";
import store from "./src/store/store";
import axios from "axios";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

/*<AuthProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </AuthProvider> */
/*
<Stack.Navigator>
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

/*

const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RRESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
      } catch (e) {}

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContenx = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dumy-auth-token" });
      },
    }),
    []
  );
*/
