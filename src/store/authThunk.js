import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";

export const signIn = createAsyncThunk("", async (param, thunkApi) => {
  const response = await fetch(`${config.API_URL}/authentication/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  });
  console.log("try to login");
  console.log(param);
  const data = await response.json();
  console.log(data);
  await storeTokens(data.token.accessToken, data.token.refreshToken, 100);
  return data;
});

export const refreshToken = createAsyncThunk("", async (param, thunkApi) => {});
