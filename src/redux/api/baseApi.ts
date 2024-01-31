import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include", // to include cookies from backend to browser

  // set access token to headers to send this token to backend with every request
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});
// custom base query
// for getting a new access token with refresh token if the access token expires
// const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {
//     const requestForAccessToken = await fetch(
//       "http://localhost:5000/api/auth/refresh-token",
//       {
//         method: "POST",
//         credentials: "include",
//       }
//     );
//     const data = await requestForAccessToken.json();
//     if (data?.data?.accessToken) {
//       const user = (api.getState() as RootState).auth.user;

//       api.dispatch(setUser({ user, token: data.data.accessToken }));
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout());
//     }
//   }
//   return result;
// };

const baseQueryWithRefreshToken = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  console.log("Base query with refresh token called");

  let result = await baseQuery(args, api, extraOptions);
  console.log("Base query result:", result);

  if (result?.error?.status === 401) {
    console.log("Received 401 error, attempting to refresh token");

    try {
      const refreshTokenResponse = await fetch(
        "http://localhost:5000/api/auth/refresh-token",
        {
          method: "POST",
          credentials: "include",
        }
      );
      console.log("Refresh token response:", refreshTokenResponse);

      if (!refreshTokenResponse.ok) {
        console.log("Refresh token response not OK, logging out");
        api.dispatch(logout());
        return result;
      }

      const data = await refreshTokenResponse.json();
      console.log("Refresh token data:", data);

      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;
        api.dispatch(setUser({ user, token: data.data.accessToken }));
        console.log("Retrying base query with new access token");
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log("No new access token received, logging out");
        api.dispatch(logout());
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      api.dispatch(logout());
    }
  } else {
    console.log("No 401 error, returning base query result");
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  // if using only default base query
  // baseQuery: baseQuery,
  // if using custom base query
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
