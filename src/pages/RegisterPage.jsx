import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Card, TextInput, Divider } from "react-native-paper";
import axiosInstance from "../utils/axiosConfig";

function RegisterPage({ navigation }) {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirm: "",
  };
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState(initialState);

  const handleSubmit = () => {
    console.log(newUser);
    if (newUser.password !== newUser.confirm) {
      console.log(passwordError);
      setPasswordError("Confirm password != password");
      return;
    }
    registerNewUser();
    console.log("ok, try to register");
  };

  const handleChange = (name, value) => {
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "email") {
      setError("");
    }
  };

  const handlePhoneNumber = (value) => {
    const cleanValue = value.replace(/\D+/g, "");
    setNewUser((prevState) => ({
      ...prevState,
      ["phoneNumber"]: cleanValue,
    }));
  };

  const handlePassword = (value) => {
    setNewUser((prevState) => ({
      ...prevState,
      ["password"]: value,
    }));

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    let error = "";
    if (value.length < minLength) {
      error = `Password must be at least ${minLength} characters long.`;
    } else if (!hasUpperCase) {
      error = "Password must contain at least one uppercase letter.";
    } else if (!hasLowerCase) {
      error = "Password must contain at least one lowercase letter.";
    } else if (!hasNumber) {
      error = "Password must contain at least one number.";
    } else if (!hasSpecialChar) {
      error = "Password must contain at least one special character.";
    }
    setPasswordError(error);
  };

  const registerNewUser = () => {
    axiosInstance
      .post(`/authentication`, JSON.stringify(newUser), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        navigation.navigate("Login");
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
        setError("This email is used");
      });
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <TextInput
                  label="First name"
                  placeholder="First name"
                  onChangeText={(text) => handleChange("firstName", text)}
                  value={newUser.firstName}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <TextInput
                  label="Last name"
                  placeholder="Last name"
                  onChangeText={(text) => handleChange("lastName", text)}
                  value={newUser.lastName}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <TextInput
                  label="Email"
                  placeholder="Email"
                  onChangeText={(text) => handleChange("email", text)}
                  value={newUser.email}
                />
                {error && <Text style={{ color: "red" }}>{error}</Text>}
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <TextInput
                  label="Phone Number"
                  placeholder="Phone Number"
                  onChangeText={(text) => handlePhoneNumber(text)}
                  value={newUser.phoneNumber}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <TextInput
                  label="Password"
                  placeholder="Password"
                  onChangeText={(text) => handlePassword(text)}
                  value={newUser.password}
                />
                {passwordError && (
                  <Text style={{ color: "red" }}>{passwordError}</Text>
                )}
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <TextInput
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  onChangeText={(text) => handleChange("confirm", text)}
                  value={newUser.confirm}
                />
              </View>
            </View>
          </Card.Content>

          <Divider />
          <Card.Content style={styles.cardAction}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={{ margin: 15 }}
            >
              Create Account
            </Button>
            <Button
              mode="contained"
              onPress={goToLogin}
              style={{ margin: 15, marginTop: 0 }}
            >
              Go to Login
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  card: {
    margin: 10,
  },
  cardAction: {
    justifyContent: "flex-end",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
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
});

export default RegisterPage;
