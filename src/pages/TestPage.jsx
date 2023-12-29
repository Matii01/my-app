import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import UserRental from "../components/User/UserRental";

function UserRentals() {
  return (
    <View>
      <Text>Rentals</Text>
    </View>
  );
}

function AccountManagment() {
  return (
    <View>
      <Text>AccountManagment</Text>
    </View>
  );
}

function Address() {
  return (
    <View>
      <Text>Address</Text>
    </View>
  );
}

function SecondRoute() {
  return (
    <View>
      <Text>SecondRoure</Text>
    </View>
  );
}

const MyComponent = () => {
  const [view, setView] = React.useState("UserRentals");

  const changeView = (newview) => {
    setView(newview);
  };

  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: "column",
        },
      ]}
    >
      <ScrollView horizontal style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeView("UserRentals")}
        >
          <Text style={styles.text}>User Rentals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeView("Account")}
        >
          <Text style={styles.text}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeView("Address")}
        >
          <Text style={styles.text}>Address</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeView("SecondRoute")}
        >
          <Text style={styles.text}>Second Route</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{ flex: 10 }}>
        {view === "UserRentals" && <UserRental />}
        {view === "Account" && <AccountManagment />}
        {view === "Address" && <Address />}
        {view === "SecondRoute" && <SecondRoute />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "#007bff",
    width: 120,
    padding: 10,
    borderRadius: 0,
    alignItems: "center", // Horizontally center
    justifyContent: "center", // Vertically center
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center", // Center text - useful for multi-line text
  },
});

export default MyComponent;
