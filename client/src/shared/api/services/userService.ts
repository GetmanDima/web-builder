import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export interface LoginRequest {
  email: string,
  password: string
}

export interface LoginResponse {
  accessToken: string
};

export interface RegisterRequest {
  email: string,
  password: string
}

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
  endpoints: (build) => ({
      login: build.mutation<LoginResponse, LoginRequest>({
          query: (data) => ({
              url: `/auth/login`,
              method: 'POST',
              body: data
          })
      }),
      register: build.mutation<{}, RegisterRequest>({
        query: (data) => ({
            url: `/auth/register`,
            method: 'POST',
            body: data
        })
    })
  })
});