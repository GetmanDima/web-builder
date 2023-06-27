import { RootState } from "@app";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { serverUrl } from "@shared/constant";

export interface GetFilesResponse {
  files: {
    _id: string;
    name: string;
    url: string,
    user: string,
    createdAt: string;
  }[]
}

export const fileAPI = createApi({
  reducerPath: "fileAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl,
    prepareHeaders(headers, { getState }) {
      const state = getState() as RootState;
      headers.set("Authorization", `Bearer ${state.user.token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getFiles: build.mutation<GetFilesResponse, {}>({
      query: () => ({
        url: `/files`,
        method: "GET",
      }),
    }),
  }),
});
