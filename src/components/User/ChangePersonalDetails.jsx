import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import axiosInstance from "../../utils/axiosConfig";

function ChangePersonalDetails() {
  const [user, setUser] = useState({
    email: " ",
    firstName: " ",
    lastName: " ",
    phoneNumber: " ",
    userName: " ",
  });

  useEffect(() => {
    axiosInstance
      .get("Users/UserPersonalDetails")
      .then((data) => {
        console.log(data);
        setUser(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <View style={styles.card}>
        <Text style={styles.header}>PERSONAL DETAILS</Text>
        <View style={styles.body}>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="First name"
                value={user.firstName}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text>Last Name</Text>

              <TextInput
                style={styles.input}
                placeholder="Last name"
                value={user.lastName}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>User name</Text>
              <TextInput
                style={styles.input}
                placeholder="User name"
                value={user.userName}
                onChangeText={() => {}}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={user.phoneNumber}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={user.email}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Button title="update personal data" />
          </View>
        </View>
      </View>
    </View>
  );
}

export default ChangePersonalDetails;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    // Styles for the body
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputGroup: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
