import { useState } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/authSlice";
import config from "../../config";
import * as SecureStore from "expo-secure-store";

function LoginPage() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    username: "ATestowy",
    password: "Pa$$w0rd",
  });

  const onClick = () => {
    login();
  };

  const login = async () => {
    const response = await fetch(`${config.API_URL}/authentication/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    await SecureStore.setItemAsync("accessToken", data.token.accessToken);
    await SecureStore.setItemAsync("refreshToken", data.token.refreshToken);
    dispatch(actions.setTokens({ ...data.token }));
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login</Text>
      <Button onPress={onClick} title="Login" />
    </View>
  );
}

export default LoginPage;
