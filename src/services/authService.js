import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authService = createApi({
  reducerPath: "authService",
  baseQuery: fetchBaseQuery({}),
});
