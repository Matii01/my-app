import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Text, TextInput, Divider } from "react-native-paper";
import { actions } from "../store/authSlice";
import config from "../../config";
import * as SecureStore from "expo-secure-store";

function LoginPage({ navigation }) {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");
  const [loginData, setLoginData] = useState({
    username: "ATestowy",
    password: "Pa$$w0rd",
  });

  const onClick = () => {
    //console.log(loginData);
    login();
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  const login = async () => {
    const response = await fetch(`${config.API_URL}/authentication/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    try {
      const data = await response.json();
      console.log(data);
      await SecureStore.setItemAsync("accessToken", data.token.accessToken);
      await SecureStore.setItemAsync("refreshToken", data.token.refreshToken);
      dispatch(actions.setTokens({ ...data.token }));
    } catch (error) {
      console.log(error);
      setLoginError(true);
    }
  };

  const handleChange = (name, value) => {
    setLoginError(false);
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <TextInput
                label="User name"
                placeholder="User name"
                onChangeText={(text) => handleChange("username", text)}
                value={loginData.username}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <TextInput
                label="Password"
                placeholder="Password"
                onChangeText={(text) => handleChange("password", text)}
                value={loginData.password}
              />
            </View>
          </View>
        </Card.Content>

        <Divider />
        <View style={styles.errorRow}>
          {loginError && (
            <Text style={styles.errorText}>Incorrect login or password</Text>
          )}
        </View>
        <Divider />
        <Card.Content style={styles.cardAction}>
          <Button mode="contained" onPress={onClick} style={{ margin: 15 }}>
            Login
          </Button>
          <Button
            mode="contained"
            onPress={goToRegister}
            style={{ margin: 15, marginTop: 0 }}
          >
            Go to Register
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    height: "70%",
  },
  cardAction: {
    height: "50%",
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
  errorRow: {
    height: 50,
    justifyContent: "center",
  },
  errorText: {
    textAlign: "center",
    color: "red",
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

export default LoginPage;
