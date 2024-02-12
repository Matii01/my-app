import axios from "axios";
import { useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { StyleSheet, ToastAndroid, View } from "react-native";
import { Button, Card, Text, TextInput, Divider } from "react-native-paper";

function ChangePasword({ ...props }) {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    retypePassword: "",
  });

  const handleChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = () => {
    if (
      data.newPassword === "" ||
      data.oldPassword === "" ||
      data.retypePassword === ""
    ) {
      setError("complete all fields");
    } else if (data.newPassword != data.retypePassword) {
      setError("passwords are different");
    } else {
      updatePassword();
    }
  };

  const updatePassword = () => {
    console.log(data);
    axiosInstance
      .post("Users/ChangePassword", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        ToastAndroid.show("Password has been changed", ToastAndroid.SHORT);
        console.log(response);
        if (response.status === 200) {
          setError("");
          console.log("password was changed");
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      });
  };

  const onUpdateClick = () => {
    handleSubmit();
  };

  return (
    <>
      <Card {...props}>
        <Card.Title title={"Password"} />
        <Card.Content>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>Old Password</Text>
              <TextInput
                placeholder="Old Password"
                value={data.oldPassword}
                onChangeText={(value) => handleChange("oldPassword", value)}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>New Password</Text>
              <TextInput
                placeholder="New Password"
                value={data.newPassword}
                onChangeText={(value) => handleChange("newPassword", value)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>Retype Password</Text>
              <TextInput
                placeholder="Retype Password"
                value={data.retypePassword}
                onChangeText={(value) => handleChange("retypePassword", value)}
              />
            </View>
          </View>
          {error && <Text style={{ color: "red" }}>{error}</Text>}
          <Card.Actions>
            <Button mode="contained" onPress={onUpdateClick}>
              Change password
            </Button>
          </Card.Actions>
        </Card.Content>
      </Card>
    </>
  );
}

export default ChangePasword;

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
