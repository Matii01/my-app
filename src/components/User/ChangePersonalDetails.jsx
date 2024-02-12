import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput, Divider } from "react-native-paper";

import axiosInstance from "../../utils/axiosConfig";

function ChangePersonalDetails({ ...props }) {
  const [user, setUser] = useState({
    email: " ",
    firstName: " ",
    lastName: " ",
    phoneNumber: " ",
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
    <>
      <Card {...props}>
        <Card.Title title="Personal Details" />
        <Card.Content>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>First Name</Text>
              <TextInput placeholder="First name" value={user.firstName} />
            </View>
            <View style={styles.inputGroup}>
              <Text>Last Name</Text>

              <TextInput placeholder="Last name" value={user.lastName} />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>Phone Number</Text>
              <TextInput placeholder="Phone Number" value={user.phoneNumber} />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>Email</Text>
              <TextInput disabled placeholder="Email" value={user.email} />
            </View>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained">Update personal data</Button>
        </Card.Actions>
      </Card>
    </>
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
