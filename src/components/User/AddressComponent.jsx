import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
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
    <View>
      <View style={styles.card}>
        <Text style={styles.header}>ADDRESS</Text>
        <View style={styles.body}>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Full name"
                onChangeText={(text) => handleChange("firstName", text)}
                value={updateAddress.firstName}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Last name"
                onChangeText={(text) => handleChange("lastName", text)}
                value={updateAddress.lastName}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>Address 1</Text>
              <TextInput
                style={styles.input}
                placeholder="Address 1"
                onChangeText={(text) => handleChange("address1", text)}
                value={updateAddress.address1}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text>Address 2</Text>
              <TextInput
                style={styles.input}
                placeholder="Address 2"
                onChangeText={(text) => handleChange("address1", text)}
                value={updateAddress.address2}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>City</Text>
              <TextInput
                style={styles.input}
                placeholder="City"
                onChangeText={(text) => handleChange("city", text)}
                value={updateAddress.city}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text>State</Text>
              <TextInput
                style={styles.input}
                placeholder="State"
                onChangeText={(text) => handleChange("state", text)}
                value={updateAddress.state}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>City</Text>
              <TextInput
                style={styles.input}
                placeholder="Zip"
                onChangeText={(text) => handleChange("zip", text)}
                value={updateAddress.zip}
              />
            </View>
          </View>

          {/* Repeat similar structures for other input fields */}

          <View style={styles.inputGroup}>
            <Text>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 Main St"
              onChangeText={(text) => handleChange("address1", text)}
              value={updateAddress.address1}
            />
          </View>

          {/* Continue with other fields like Address 2, City, State, Zip, etc. */}

          <View style={styles.checkboxContainer}>
            <Switch
              value={updateAddress.isDefault}
              onValueChange={(value) => handleChange("isDefault", value)}
            />
            <Text>Is default</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {address == null ? "Add" : "Update"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
