import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import UserRental from "../components/User/UserRental";
import ChangeAddress from "../components/User/ChangeAddress";
import AccountManagment from "../components/User/AccountManagment";
import UserWishList from "../components/User/UserWishlist";

const MyComponent = ({ navigation }) => {
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
        <Button
          mode="contained"
          style={styles.newButton}
          onPress={() => changeView("UserRentals")}
        >
          User Rentals
        </Button>

        <Button
          mode="contained"
          style={styles.newButton}
          onPress={() => changeView("Account")}
        >
          Account
        </Button>
        <Button
          mode="contained"
          style={styles.newButton}
          onPress={() => changeView("Address")}
        >
          Address
        </Button>

        <Button
          mode="contained"
          style={styles.newButton}
          onPress={() => changeView("Wishlist")}
        >
          Wish List
        </Button>
      </ScrollView>
      <View style={{ flex: 10 }}>
        {view === "UserRentals" && <UserRental />}
        {view === "Account" && <AccountManagment />}
        {view === "Address" && <ChangeAddress />}
        {view === "Wishlist" && <UserWishList />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newButton: {
    borderRadius: 0,
    alignItems: "center", // Horizontally center
    justifyContent: "center", // Vertically center
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

/** return (
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
          onPress={() => changeView("Wishlist")}
        >
          <Text style={styles.text}>Wish List</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{ flex: 10 }}>
        {view === "UserRentals" && <UserRental />}
        {view === "Account" && <AccountManagment />}
        {view === "Address" && <ChangeAddress />}
        {view === "Wishlist" && <UserWishList />}
      </View>
    </View>
  ); */
