import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ToastAndroid,
} from "react-native";
import { Button, Card, Text, TextInput, Divider } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import axiosInstance from "../../utils/axiosConfig";

function AddressComponent({ address, onAdd }) {
  const [updateAddress, setUpdatedAddress] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
  });

  useEffect(() => {
    if (address != undefined) {
      setUpdatedAddress({ ...address });
    }
  }, [address]);

  const handleChange = (name, value) => {
    setUpdatedAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (address === undefined) {
      addNewAddres();
    } else {
      onUpdateAddress();
    }
  };

  const onUpdateAddress = () => {
    axiosInstance
      .put(
        `/Users/UpdateUserAddresses/${updateAddress.id}`,
        JSON.stringify(updateAddress),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        ToastAndroid.show("Data has been updated", ToastAndroid.SHORT);
        console.log(data);
        onAdd();
      });
  };

  const addNewAddres = () => {
    axiosInstance
      .post(`/Users/AddUserAddresses`, JSON.stringify(updateAddress), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
        onAdd();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card style={{ margin: 5, marginTop: 15 }}>
        <Card.Title title="Address" />
        <Card.Content>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <TextInput
                label="First name"
                placeholder="First name"
                onChangeText={(text) => handleChange("firstName", text)}
                value={updateAddress.firstName}
              />
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                label="Last name"
                placeholder="Last name"
                onChangeText={(text) => handleChange("lastName", text)}
                value={updateAddress.lastName}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <TextInput
                label="Address 1"
                placeholder="Address 1"
                onChangeText={(text) => handleChange("address1", text)}
                value={updateAddress.address1}
              />
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                label="Address 2"
                placeholder="Address 2"
                onChangeText={(text) => handleChange("address2", text)}
                value={updateAddress.address2}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <TextInput
                label="City"
                placeholder="City"
                onChangeText={(text) => handleChange("city", text)}
                value={updateAddress.city}
              />
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                label="State"
                placeholder="State"
                onChangeText={(text) => handleChange("state", text)}
                value={updateAddress.state}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <TextInput
                label="Zip"
                placeholder="Zip"
                onChangeText={(text) => handleChange("zip", text)}
                value={updateAddress.zip}
              />
            </View>
          </View>

          <View style={styles.checkboxContainer}>
            <Switch
              value={updateAddress.isDefault}
              onValueChange={(value) => handleChange("isDefault", value)}
            />
            <Text>Is default</Text>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleSubmit}>
            {address == null ? "Add" : "Update"}
          </Button>
        </Card.Actions>
      </Card>
    </>
  );
}

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

export default AddressComponent;
